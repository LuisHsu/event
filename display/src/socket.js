import { ipcRenderer } from "electron";

let handlers = {}

export function regist_handler(key, handler){
    handlers[key] = handler;
}

ipcRenderer.on("show_categories", (_, data) => {
    if("show_categories" in handlers){
        handlers["show_categories"](data);
    }
});
ipcRenderer.on("select_category", (_, data) => {
    if("select_category" in handlers){
        handlers["select_category"](data);
    }
});
ipcRenderer.on("show_question", (_, data) => {
    if("show_question" in handlers){
        handlers["show_question"](data);
    }
});
ipcRenderer.on("show_answer", () => {
    if("show_answer" in handlers){
        handlers["show_answer"]();
    }
});
ipcRenderer.on("show_choice", (_, data) => {
    console.log("show_choice")
    if("show_choice" in handlers){
        handlers["show_choice"](data);
    }
});
ipcRenderer.on("set_timer", (_, data) => {
    if("set_timer" in handlers){
        handlers["set_timer"](data);
    }
});
ipcRenderer.on("clear_timer", () => {
    if("clear_timer" in handlers){
        handlers["clear_timer"]();
    }
});

export const send = ipcRenderer.send