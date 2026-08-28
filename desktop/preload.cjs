const {contextBridge}=require('electron');
contextBridge.exposeInMainWorld('sbsDesktop',{platform:process.platform,version:'0.1.0'});
