import { app, BrowserWindow, ipcMain } from "electron";
import { display_token, ws_server } from "../constants.mjs";
import io from "socket.io-client"

let window = null;
let categories = [];

function loadPage(path = ""){
    return window.loadFile("build/index.html", {
        hash: path
    })
}

app.whenReady().then(() => {
    window = new BrowserWindow({
        fullscreen: false,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    loadPage("").then(() => {
        window.webContents.openDevTools();
    });
})

ipcMain.on("get_categories", () => {
    window.webContents.send("show_categories", categories);
})

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

socket.on("show_categories", data => {
    categories = data;
    if(window !== null){
        loadPage("category");
    }else{
        console.error("no window")
    }
})
socket.on("show_question", question => {
    if(window !== null){
        loadPage("question")
        .then(() => {
            window.webContents.send("show_question", question);
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
