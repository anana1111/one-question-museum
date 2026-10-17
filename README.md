# 一个问题的博物馆

ANNA 的静态个人问题博物馆。Astro 7.4.0（创建时 npm latest），无后端、数据库或客户端框架。Node.js 24，npm；依赖通过 package-lock.json 锁定。

## 本地运行

```sh
npm ci
npm run dev
```

打开终端显示的 localhost 地址。`npm run build` 先做 Astro/TypeScript 检查再输出 dist；`npm run preview` 预览构建结果。

## 页面与结构

- `src/content/exhibits/*.json`：每件展品一份数据，Content Collections 构建时校验。
- `src/content.config.ts`：数据 schema，必须填写全部核心字段。
- `src/pages/index.astro`：展厅与自动汇总。
- `src/pages/exhibits/[id].astro`：四段式展品模板，上一件/下一件仅在已展出展品之间导航。
- `src/components/Occlusion.astro`：001 Canvas 交互，仅展品页加载脚本。
- `src/pages/projects.astro`、`unsolved.astro`、`about.astro`：项目索引、未解决、理念。
- `src/lib/museum.ts`：展厅、结局文案、基础路径与数据查询。
- `src/styles/global.css`：字体与明暗主题。

## 新增一件展品

1. 复制 `templates/exhibit.json` 为 `src/content/exhibits/004.json`。文件名、`id` 保持一致，编号三位且不可重复。
2. 填写 `title`、`date`（YYYY-MM-DD）、`project`、`hall`、`stuckHours`（非负数）、`oneLiner`。
3. `outcome` 为 `solved` / `bypassed` / `unsolved`；`status` 为 `published` / `planned`。
4. `context` 填“当时在做什么”，`resolution` 填解决/绕开/未解决的真实过程。真实记录把 `demo` 改为 `false`，`locale` 暂填 `zh`。
5. 在 `src/components/` 新建独立 Astro 交互组件，例如 `MyExperiment.astro`。在 `[id].astro` 导入组件，为 `interaction` 的新标识增加分支，并更新顶部合法值校验。用 Astro `<script>` 管理页面脚本；大库请在交互启动时 `import()`，不要在 Layout 或首页引入。组件样式可用 Astro scoped style。
6. `interaction: "none"` 可先跑通内容，但正式展出前应补交互以满足收录规则。筹展条目无详情链接、不生成页面，显示虚线展签。
7. `npm run build` 验证，提交后自动部署。

复制模板后先设 `status: "planned"`，避免未完成内容上线。示范数据不是实际经历；正式录入时务必填写真实日期/时长/结局。

## 新增展厅

把新名称加入 `src/lib/museum.ts` 的 `halls` 数组即可显示空展厅。展品 `hall` 填相同名称；数据里出现的新展厅也会自动追加。项目索引自动生成，无需另配项目表。

## 统计口径

首页小时数只累计 `status: published` 且 `demo: false` 的条目；穿过的问题只计这些条目里 solved/bypassed 的数量。示范与筹展不计。未解决页只显示已展出的 unsolved 条目（含明确标注的示范）。

## GitHub Pages 部署

1. 新建 GitHub 仓库，将本目录内容上传到仓库根目录，默认分支 `main`，包含 package-lock.json 与 `.github/`。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 推送 main，或 Actions 手动运行 Deploy Astro to GitHub Pages。工作流自动读取 Pages 的 origin / base_path，兼容 `用户名.github.io/仓库名/`、个人根站及自定义域名。
4. 成功后在 Actions 部署环境打开站点。无需密钥或付费服务器。GitHub Pages 服务的可用性与额度遵守 GitHub 自身规则。

本地验证子路径：
```sh
SITE_URL=https://example.github.io BASE_PATH=/museum npm run build
npm run preview
```
访问 `/museum/`。自定义域名在 Pages 设置中配置；如需 CNAME 文件，可放到 public/CNAME。静态部署不需要安装 Astro server adapter。

## 设计、可访问性与多语言

标题：Noto Serif SC → Songti SC → STSong → SimSun；正文：Noto Sans SC → PingFang SC → Microsoft YaHei。默认使用本机字体，无外部字体请求；若需所有设备完全一致，可将有许可的中文 WOFF2 子集放 public/fonts 后加 @font-face。

明暗模式默认跟随系统，手动选择保存在 localStorage（受限环境下仍可切换）。交互支持键盘原生滑块、暂停、系统减少动态效果与后台暂停；减少动态效果时滑动只更新静态帧。Canvas 是教学模拟，不是真实姿态识别。

`locale` 已预留 zh/ja/en；当前只展示中文。未来可按语言目录扩展路由、抽取 UI 字典并在 Layout 切换 lang。每种语言的编号应在各自语言内唯一。

## 发布前自检

桌面与手机检查首页/示范页；切换明暗；用方向键拖滑块；暂停/恢复；打开系统减少动态效果；检查所有导航。构建检查不代替实际浏览器与设备验证。
