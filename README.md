# 翁法罗斯 · 模拟监看（开源版）

一个粉丝向的《崩坏：星穹铁道》翁法罗斯主题桌面程序：外层是 δ-me13 的模拟运行监看，
内层是编年史、电信号序列，以及可反复推演的演算沙盘（12 个抉择点 / 5 种结局）。

> **这是非官方、非营利的同人作品**，与米哈游无关。
> **本仓库不包含任何官方美术素材与音乐**（立绘、徽记、BGM 均未分发），
> 缺失素材时程序自动显示占位，功能不受影响；补素材的方法见 `assets/README.md`。

- 作者：天道之D菌（B 站同名）

## 直接运行

用 Chrome / Edge 打开 `index.html` 即可 —— 单文件、零依赖、`file://` 直接可跑。

## 打包成 Windows exe

```bash
cd desktop
npm install
# 国内网络建议
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
node node_modules/electron/install.js   # npm 的 allowScripts 可能跳过 postinstall
npx electron-builder --win portable     # 产物：desktop/dist/*.exe
```

打包前把页面与素材同步进包内目录：

```
desktop/app/index.html      <- index.html 的副本
desktop/app/assets/...      <- 素材副本
desktop/app/bgm.mp3         <- 背景音乐（可选）
```

## 交互说明

| 位置 | 操作 |
|---|---|
| 开场 | 点「进入」；开场门之前是纯画面 |
| 编年史 | 自动播放十幕，**请勿点击**（点击跳过当前幕） |
| 归档 99% | 弹「是否强制重启 δ-me13.exe」→ 是，进入演算沙盘 |
| 顶栏 | 「▶ 进入演算」随时可再进沙盘 |
| 沙盘 | `0.5× / 1× / 2× / 4×` 倍速、`Ⅱ 暂停`（空格）、`← 返回`（Esc） |
| 个体档案 | 点右栏任一条目，查看完整生平与对应命途立绘 |

调试参数：`?shot=1`、`?gate=1&auto=1`、`?scene=n`、`?sim=1`、`?progress=99`、`?agent=1`。

## 版权说明

- 代码（HTML/CSS/JS）以 MIT 许可发布，可自由学习、修改、二次创作；
- 《崩坏：星穹铁道》及其角色、剧情、设定版权归米哈游所有；
- 本项目不含官方素材；若你将素材补入本地副本，请自行承担相应合规责任，**不得用于任何商业用途**；
- 本项目为个人娱乐作品，禁止售卖、冒名发布。

## 致谢

米哈游《崩坏：星穹铁道》翁法罗斯篇，以及所有整理时间线的同好。
