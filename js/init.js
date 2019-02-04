// Regular DOM

var statusMessage = document.getElementById('boxStatusMessage');

statusMessage.innerHTML = '';

function onButtonClick(buttonId) {
    console.log('onButtonClick()');

    var date = new Date();

    statusMessage.innerHTML = 'Button ' + buttonId + ' clicked at ' + date;
}

document.getElementById('buttonA').onclick = function() { onButtonClick("A"); };
document.getElementById('buttonB').onclick = function() { onButtonClick("B"); };
document.getElementById('buttonC').onclick = function() { onButtonClick("C"); };
document.getElementById('buttonD').onclick = function() { onButtonClick("D"); };

// Node / Electron

const {ipcRenderer} = require('electron')

ipcRenderer.on('message', (event, arg) => {
    console.log('ipcMain.on message: ' + arg);

    event.returnValue = 'pong'
});

document.getElementById('buttonQuit').onclick = function () {
    console.log('buttonQuit click');

    ipcRenderer.send('quit', '');
};

document.getElementById('buttonAbout').onclick = function () {
    console.log('buttonQuit click');

    ipcRenderer.send('about', '');
};