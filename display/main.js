import { app, BrowserWindow, ipcMain } from "electron";
import { display_token, ws_server } from "../constants.mjs";
import io from "socket.io-client"

let window = null;
let categories = [];
let question = {};

app.whenReady().then(() => {
    window = new BrowserWindow({
        fullscreen: false,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    window.loadFile("build/index.html").then(() => {
        window.webContents.openDevTools();
    });
})

ipcMain.on("get_categories", () => {
    if(window !== null){
        console.log("get categories")
        window.webContents.send("show_categories", categories);
    }else{
        console.error("no window")
    }
})

ipcMain.on("get_question", () => {
    if(window !== null){
        console.log("get question")
        window.webContents.send("show_question", question);
    }else{
        console.error("no window")
    }
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

socket.on("show_choice", choice => {
    console.log(`show choice ${choice}`)
    if(window !== null){
        window.webContents.send("show_choice", choice);
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
    console.log("show categories")
    if(window !== null){
        window.loadFile("build/category.html")
        .then(() => {
            console.log("category loaded")
            window.webContents.send("show_categories", categories);
        })
    }else{
        console.error("no window")
    }
})
socket.on("show_question", data => {
    question = data;
    console.log("show question")
    if(window !== null){
        window.loadFile("build/question.html")
        .then(() => {
            console.log("question loaded")
        })
    }else{
        console.error("no window")
    }
})
socket.on("show_answer", () => {
    console.log("show answer")
    if(window !== null){
        window.webContents.send("show_answer");
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

socket.on("set_timer", time => {
    if(window !== null){
        window.webContents.send("set_timer", time);
    }else{
        console.error("no window")
    }
})
socket.on("clear_timer", () => {
    if(window !== null){
        window.webContents.send("clear_timer");
    }else{
        console.error("no window")
    }
})