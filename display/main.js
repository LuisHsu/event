import { app, BrowserWindow } from "electron";
import { display_token, ws_server } from "../constants.mjs";
import io from "socket.io-client"

let window = null;

const socket = io(`${ws_server}/display`, {
    auth:{
        token: display_token
    }
})

socket.on("show_url", url => {
    if(window !== null){
        window.loadURL(url);
    }else{
        console.error("no window")
    }
})

app.whenReady().then(() => {
    window = new BrowserWindow({fullscreen: true});
})