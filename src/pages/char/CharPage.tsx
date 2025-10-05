
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { damageLunar } from '../../core/formula/lunar'
import { calcResCoef } from '../../core/formula/resistance'

type Move = {
  move_key: string
  tag: string
  lvl: number
  hits: number
  coef_pct: number
  energy_cost?: number
  cd_s?: number
  window_s?: number
}

type MovesFile = {
  char: string
  moves: Move[]
  updated_at?: string
}

export default function CharPage() {
  const { name } = useParams()
  const [moves, setMoves] = useState<MovesFile | null>(null)
  const [buffs, setBuffs] = useState<any | null>(null)
  const [meta, setMeta] = useState<any | null>(null)

  useEffect(() => {
    async function load() {
      const mv = await fetch(`/data/${name}/moves.json`).then(r => r.json())
      const bf = await fetch(`/data/${name}/buffs.json`).then(r => r.json())
      const mt = await fetch(`/data/${name}/meta.json`).then(r => r.json())
      setMoves(mv); setBuffs(bf); setMeta(mt)
    }
    load()
  }, [name])

  const [panel, setPanel] = useState({
    atk: 2000,
    em: 300,
    critRate: 0.75,
    critDmg: 1.5,
    electroDmg: 0.466, // 雷伤加成（圣遗物杯）
    enemyRes: 0.10,    // 敌人雷抗10%
  })

  if (!moves || !buffs || !meta) return <div>加载中…</div>

  const mgcBonusAdd = 0.20 // 天赋常驻月感电+20%
  const c6Uplift = 0       // C6=0.45 时改为 0.45

  const resCoef = calcResCoef(panel.enemyRes - (buffs.buffs?.find((b:any)=>b.key==='c2_res')?.value ?? 0))

  const smallQ = moves.moves.filter(m => m.move_key.startsWith('Q_small') && m.tag === '月感电')
  const bigQ = moves.moves.filter(m => m.move_key.startsWith('Q_big') && m.tag === '月感电')

  function sumLunar(list: Move[]) {
    return list.reduce((acc, m) => {
      const coef = (m.coef_pct / 100) * m.hits
      const val = damageLunar({
        atk: panel.atk,
        coef,
        em: panel.em,
        addBonus: mgcBonusAdd + panel.electroDmg, // 加算乘区：雷伤% + 月感电增伤
        critRate: panel.critRate,
        critDmg: panel.critDmg,
        uplift: c6Uplift, // 独立乘区（C6=0.45）
        resCoef
      })
      return acc + val.avg
    }, 0)
  }

  const smallQOnce = sumLunar(smallQ)
  const bigQOnce = sumLunar(bigQ)

  return (
    <div>
      <h2>{moves.char.toUpperCase()} · 月感电计算演示</h2>
      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <div>
          <h3>面板（示例，可修改）</h3>
          <label>ATK <input type="number" value={panel.atk} onChange={e=>setPanel({...panel, atk:+e.target.value})}/></label><br/>
          <label>EM <input type="number" value={panel.em} onChange={e=>setPanel({...panel, em:+e.target.value})}/></label><br/>
          <label>CRIT% <input type="number" step="0.01" value={panel.critRate} onChange={e=>setPanel({...panel, critRate:+e.target.value})}/></label><br/>
          <label>CDMG <input type="number" step="0.01" value={panel.critDmg} onChange={e=>setPanel({...panel, critDmg:+e.target.value})}/></label><br/>
          <label>雷伤% <input type="number" step="0.01" value={panel.electroDmg} onChange={e=>setPanel({...panel, electroDmg:+e.target.value})}/></label><br/>
          <label>敌人雷抗 <input type="number" step="0.01" value={panel.enemyRes} onChange={e=>setPanel({...panel, enemyRes:+e.target.value})}/></label>
        </div>
        <div>
          <h3>单次释放（仅月感电段）</h3>
          <p>小Q一次平均总伤：<b>{smallQOnce.toFixed(0)}</b></p>
          <p>大Q一次平均总伤：<b>{bigQOnce.toFixed(0)}</b></p>
          <p style={{fontSize:12,opacity:.7}}>说明：此页仅做演示。真实循环与能量/覆盖率需在计算器页细化。</p>
        </div>
      </section>
    </div>
  )
}
