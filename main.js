const { app, BrowserWindow, Menu, Tray } = require('electron');

let win;

const createWindow = () => {
     win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {//webPreferences değiştirmezsek kodumuza eklediğimiz bazı require ler hata veriyor
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    },
      autoHideMenuBar:true
    })
    win.loadFile('index.html')
    
  };
  app.whenReady().then(() => {
    createWindow()
    appIcon = new Tray('power.ico')
    var contextMenu = Menu.buildFromTemplate([
      { label: 'Quit',
        click: function() {
          app.quit();
        }
      },
    ])
    appIcon.setToolTip('Shutdown App.')
    appIcon.setContextMenu(contextMenu)
    appIcon.on("double-click", () => win.show());
   
  })

  const mainMenuTemplate  = [//güncellenmiş electron menüsü
    {
      label: 'Dosya',
      submenu: [
        {
          label:'Çıkış', 
          accelerator: process.platform=="win32" ? "Ctrl+Q" : "Ctrl+Shift+Q",
          role: 'quit' 
        }
      ]
    },
    {
      label:'Dev Tools',
      submenu:[
        {
          label:'Geliştirici Penceresini Aç',
          click(item,focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    },
    {
      label:'Görüntü',
      submenu:[
        {
          label:'Yenile',
          accelerator: process.platform=="win32" ? "Ctrl+R" : "Ctrl+Shift+R",
          role:'reload'
        },
        {
          label:'Küçült',
          accelerator: process.platform=="win32" ? "Ctrl+M" : "Ctrl+Shift+M",
          role:'minimize'
        }
      ]
    }
  ]
  
  if(process.platform == 'win32'){
    mainMenuTemplate.unshift({
      label : app.getName(),
      role : "Shutdown"
    })
  }
  
  const menu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(menu)