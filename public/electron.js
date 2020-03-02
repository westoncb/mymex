const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const protocol = electron.protocol

protocol.registerSchemesAsPrivileged([{scheme: "memexdata", privileges: { standard: true, bypassCSP: true}}])

function createWindow() {

    protocol.registerFileProtocol('memexdata', (request, callback) => {
        const url = request.url.substr(12)
        callback({ path: path.join(app.getPath('userData'), url) })
    }, (error) => {
        if (error) console.error('Failed to register protocol')
    })

    // Setting 'nodeIntegration' true is a temporary solution and could be a security issue
    mainWindow = new BrowserWindow({ width: 1600, height: 900, webPreferences: { nodeIntegration: true, plugins: true} })

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
    mainWindow.toggleDevTools();
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});