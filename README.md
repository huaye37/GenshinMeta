
# TeyvatLab · 原神伤害计算（纯前端模板）

> 纯前端 · 静态托管 · 数据中心在 `/public/data` · 公式在 `/src/core/formula`

## 开发
```bash
npm i
npm run dev
```

## 构建
```bash
npm run build
npm run preview
```

## 部署（GitHub Pages）
- 打开 Settings → Pages → 选择 GitHub Actions
- 仓库已有 `.github/workflows/deploy.yml`，push 到 main 即自动部署。

## 数据
- 角色数据：`/public/data/<char>/{moves,buffs,meta}.json`
- 示例：`flins` 已内置“月感电”段落（大Q三段、小Q两段）

## 免责声明
此项目仅用于学习与研究，数据来源于 OBC 与玩家实测，实际游戏数值以官方为准。
