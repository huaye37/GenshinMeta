
export function damageLunar({
  atk,
  coef,       // 技能系数(已合并段数) -> 小数，如 2.689344 => 268.9344%
  em,
  addBonus,   // 加算乘区：雷伤% + 月感电增伤（天赋等）
  critRate,   // 0~1
  critDmg,    // 例如 1.5 表示+150%
  uplift,     // 独立乘区（擢升），如 C6=0.45，否则 0
  resCoef     // 抗性系数
}: {
  atk: number
  coef: number
  em: number
  addBonus: number
  critRate: number
  critDmg: number
  uplift: number
  resCoef: number
}) {
  const emBonus = 6 * em / (em + 2000)
  const base = 3 * atk * coef
  const preCrit = base * (1 + addBonus + emBonus) * (1 + uplift) * resCoef
  const avgCrit = preCrit * (1 + critRate * critDmg)
  return { base, preCrit, avg: avgCrit }
}
