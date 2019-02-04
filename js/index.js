const{ app, BrowserWindow, Menu } = require('electron')

const { ipcMain } = require('electron')
const { ipcRenderer } = require('electron')

let mainWindow;
let aboutWindow;

app.on('ready', createWindow);

// When all windows are closed
app.on('window-all-closed', () => {
    // For Mac, to maintain application menu
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

function createWindow() {
    console.log('createWindow()');

    // Main window
    mainWindow = new BrowserWindow({ width: 800, height: 600, title: "Electron basic app" });

    var menu = Menu.buildFromTemplate([
        {
            label: 'Main',
            submenu: [
                {label:'Settings'},
                {label:'Exit'}
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    mainWindow.loadFile('html/index.html');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        console.log('window closed');

        app.quit();

        mainWindow = null;
    });
}

ipcMain.on('message', (event, arg) => {
    console.log('ipcMain.on message ' + arg);

    event.returnValue = 'pong'
});

ipcMain.on('quit', (event, arg) => {
    console.log('ipcMain.on message quit');

    app.quit();
});

ipcMain.on('about', (event, arg) => {
    console.log('ipcMain.on message about');

    if (aboutWindow === null || aboutWindow === undefined) {
        aboutWindow = new BrowserWindow({ width: 800, height: 600, title: "About window", show: false });

        aboutWindow.loadFile('html/about.html');

        aboutWindow.on('closed', () => {
            console.log('window closed');

            aboutWindow = null;
        });
    }

    aboutWindow.show();
});