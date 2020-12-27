// Regular DOM

let devToolsEnabled = false;

var statusMessage = document.getElementById('boxStatusMessage');

statusMessage.innerHTML = '';

function onButtonClick(buttonId) {
    console.log('onButtonClick()');

    var date = new Date();

    statusMessage.innerHTML = 'Button ' + buttonId + ' clicked at ' + date;
}

document.getElementById('buttonA').onclick = () => { onButtonClick("A"); };
document.getElementById('buttonB').onclick = () => { onButtonClick("B"); };
document.getElementById('buttonC').onclick = () => { onButtonClick("C"); };
document.getElementById('buttonD').onclick = () => { onButtonClick("D"); };

// Node / Electron

const electron = require('electron')

const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('message', (event, arg) => {
    console.log('ipcMain.on message: ' + arg);

    event.returnValue = 'pong'
});

document.getElementById('buttonQuit').onclick = () => {
    console.log('buttonQuit click');

    ipcRenderer.send('quit', '');
};

document.getElementById('buttonAbout').onclick = () => {
    console.log('buttonQuit click');

    ipcRenderer.send('about', '');
};

document.getElementById('buttonDevTools').onclick = () => {
    console.log('buttonDevTools click');

    devToolsEnabled = !devToolsEnabled;

    //electron.remote.getCurrentWindow().webContents.openDevTools();
    if (devToolsEnabled)
        electron.remote.getCurrentWindow().webContents.openDevTools();
    else
        electron.remote.getCurrentWindow().webContents.closeDevTools();
};