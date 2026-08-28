const {app,BrowserWindow,Menu,protocol,net,shell}=require('electron');
const path=require('path');
const APP_ORIGIN='app://bundle';
protocol.registerSchemesAsPrivileged([{scheme:'app',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
function create(){
  const icon=app.isPackaged?path.join(process.resourcesPath,'sbs-icon.png'):path.join(__dirname,'../public/sbs-icon.png');
  const win=new BrowserWindow({width:1440,height:920,minWidth:1080,minHeight:700,title:'SBS 无人机足球工作台',icon,backgroundColor:'#f2f3f5',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,sandbox:true}});
  const openStudent=()=>win.loadURL(`${APP_ORIGIN}/index.html`);
  const openAdmin=()=>win.loadURL(`${APP_ORIGIN}/index.html#/admin`);
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'SBS 无人机足球工作台',submenu:[{label:'学员端',accelerator:'CmdOrCtrl+1',click:openStudent},{label:'管理后台',accelerator:'CmdOrCtrl+2',click:openAdmin},{type:'separator'},{role:'quit'}]},
    {label:'编辑',submenu:[{role:'undo'},{role:'redo'},{type:'separator'},{role:'cut'},{role:'copy'},{role:'paste'},{role:'selectAll'}]},
    {label:'视图',submenu:[{role:'reload'},{role:'togglefullscreen'}]}
  ]));
  openStudent();
  win.webContents.setWindowOpenHandler(({url})=>{if(url.startsWith(APP_ORIGIN))return{action:'allow'};shell.openExternal(url);return{action:'deny'}});
}
app.whenReady().then(()=>{
  const webRoot=path.join(__dirname,'dist-web');
  protocol.handle('app',request=>{
    const url=new URL(request.url);
    const requested=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);
    const target=path.normalize(path.join(webRoot,requested));
    if(!target.startsWith(webRoot))return new Response('Not found',{status:404});
    return net.fetch(require('url').pathToFileURL(target).toString());
  });
  create();
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)create()});
