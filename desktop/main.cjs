const {app,BrowserWindow,shell}=require('electron');
const path=require('path');
const APP_URL='https://sbs-drone-soccer-workbench.dons-met-1wralguhu.chatgpt.site';
function create(){const icon=app.isPackaged?path.join(process.resourcesPath,'sbs-icon.png'):path.join(__dirname,'../public/sbs-icon.png');const win=new BrowserWindow({width:1440,height:920,minWidth:1080,minHeight:700,title:'SBS 无人机足球工作台',icon,backgroundColor:'#f2f3f5',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,sandbox:true}});win.setMenuBarVisibility(false);win.loadURL(APP_URL);win.webContents.setWindowOpenHandler(({url})=>{if(url.startsWith(APP_URL))return{action:'allow'};shell.openExternal(url);return{action:'deny'}})}
app.whenReady().then(create);app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)create()});
