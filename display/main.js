import { app, BrowserWindow } from "electron";
import { display_token, ws_server } from "../constants.mjs";
import io from "socket.io-client"

let window = null;

const socket = io(`${ws_server}/display`, {
    auth:{
        token: host_token
    }
})

app.whenReady().then(() => {
    window = new BrowserWindow({fullscreen: true});
    window.loadURL("https://www.google.com")
})