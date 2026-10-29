// 翁法罗斯 · 模拟监看
// 制作 · 天道之D菌
// 本文件只做一件事：把纯静态的单页作品装进一个干净的窗口里。
// 立绘素材版权归 miHoYo 所有；此作为同人作品，非商业用途。

const { app, BrowserWindow, Menu, dialog, session } = require('electron');
const path = require('path');

const CREDIT = '制作 · 天道之D菌';
const APP_TITLE = '翁法罗斯 · 模拟监看　　' + CREDIT;

// 本机（360 安全环境）Chromium 沙箱初始化会失败并静默退出，故关闭沙箱；
// 本程序只加载本地静态页面、禁一切外链与 Node 访问，风险可接受。
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.setName('翁法罗斯');

// 单实例
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });
}

let win = null;

function createWindow() {
  const { screen } = require('electron');
  const wa = screen.getPrimaryDisplay().workAreaSize;
  const w = Math.max(1100, Math.min(1380, wa.width - 120));
  const h = Math.max(680, Math.min(860, wa.height - 120));
  win = new BrowserWindow({
    width: w,
    height: h,
    center: true,
    minWidth: 1100,
    minHeight: 680,
    show: false,
    backgroundColor: '#05080f',
    title: APP_TITLE,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      spellcheck: false,
      backgroundThrottling: false,
      webSecurity: true
    }
  });

  Menu.setApplicationMenu(null);
  const argv = process.argv.slice(1).join(' ');
  const directQ = {};
  if (/--sim\b/.test(argv)) { directQ.sim = '1'; if (/--auto\b/.test(argv)) directQ.auto = '1'; }
  if (/--reboot\b/.test(argv)) directQ.reboot = '1';
  if (/--scene\b/.test(argv)) directQ.scene = '0';
  win.loadFile(path.join(__dirname, 'app', 'index.html'), Object.keys(directQ).length ? { query: directQ } : undefined);

  win.once('ready-to-show', () => win.show());

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (e) => e.preventDefault());
  win.webContents.on('context-menu', (e) => e.preventDefault());

  win.webContents.on('before-input-event', (event, input) => {
    const key = (input.key || '').toLowerCase();
    const ctrl = input.control || input.meta;
    if (key === 'f12' || (ctrl && input.shift && key === 'i') || (ctrl && key === 'u')) {
      event.preventDefault();
    }
    if (key === 'f1') {
      event.preventDefault();
      dialog.showMessageBox(win, {
        type: 'info',
        title: '关于',
        message: '翁法罗斯 · 模拟监看',
        detail:
          CREDIT +
          '\n\n这是一件《崩坏：星穹铁道》同人作品，为非商业用途的个人创作。\n' +
          '界面内所有角色立绘、名称与设定素材版权归 miHoYo 所有。\n' +
          '程序与文案整理：天道之D菌。\n\n' +
          '快捷键：F11 全屏 / Esc 退出全屏 / F1 本窗口',
        buttons: ['知道了']
      });
    }
  });

  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(permission === 'media');
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
