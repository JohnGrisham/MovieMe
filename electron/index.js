const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const isDevMode = require('electron-is-dev');
const { injectCapacitor, CapacitorSplashScreen } = require('@capacitor/electron');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;


//Google API Key for geocoding
process.env.GOOGLE_API_KEY = 'AIzaSyBKM9opS6Z9K3HCe7mZzviapQyrpnfy_vw'
process.env.GOOGLE_DEFAULT_CLIENT_ID = '1006427140617-j8j27nfph5la8edaksc11ouq3uad204t.apps.googleusercontent.com'
process.env.GOOGLE_DEFAULT_CLIENT_SECRET = '7VLl7jHbOkVZZEhzUM2PecHB'

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'Open Dev Tools',
        click() {
          mainWindow.openDevTools();
        },
      },
    ],
  },
];

async function createWindow () {
  //Set the screen variable
  let electronScreen = electron.screen;

  // Define our main window size
  mainWindow = new BrowserWindow({
    height: electronScreen.getPrimaryDisplay().workAreaSize.height,
    width: electronScreen.getPrimaryDisplay().workAreaSize.width,
    show: false
  });

  mainWindow.setResizable(false);

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
  }

  if(useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
    mainWindow.loadURL(await injectCapacitor(`file://${__dirname}/app/index.html`), {baseURLForDataURL: `file://${__dirname}/app/`});
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }
  mainWindow.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
