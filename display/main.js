import { app, BrowserWindow } from "electron";
import { display_token, ws_server } from "../constants.mjs";
import io from "socket.io-client"

let window = null;

function loadPage(path = ""){
    if(process.env["DEVEL"] === "1"){
        return window.loadURL(`http://localhost:3001/${path}`)
    }
}

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

socket.on("fullscreen", value => {
    if(window !== null){
        window.setFullScreen(value);
    }else{
        console.error("no window")
    }
})

socket.on("show_categories", categories => {
    if(window !== null){
        loadPage("category")
        .then(() => {
            window.webContents.send("show_categories", categories);
        })
    }else{
        console.error("no window")
    }
})

socket.on("select_category", category => {
    if(window !== null){
        window.webContents.send("select_category", category);
    }else{
        console.error("no window")
    }
})

app.whenReady().then(() => {
    window = new BrowserWindow({
        fullscreen: false,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    loadPage("question");
})