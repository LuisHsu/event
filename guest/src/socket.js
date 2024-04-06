import io from "socket.io-client"
import {guest_token, ws_server} from "./constants.mjs"

let socket = null;

let handlers = {}

export function regist_handler(key, handler){
    handlers[key] = handler;
}

export function login(id, username, onLogin = () => {}, onLogout = () => {}){
    return new Promise((resolve, reject) => {
        if(socket !== null){
            socket.disconnect()
            socket = null;
        }
        socket = io(`${ws_server}/guest`, {
            auth:{
                token: guest_token,
                id, name: username
            }
        })
        .on("connect", () => {
            resolve()
            onLogin(id, username)
        })
        .on("connect_error", reject)

        socket.on("show_question", (data) => {
            if("show_question" in handlers){
                handlers["show_question"](data);
            }
        })

        socket.on("set_speaker", (data) => {
            console.log(`speaker ${data}`)
            if("set_speaker" in handlers){
                handlers["set_speaker"](data);
            }
        })

        socket.on("disconnect", () => {
            onLogout();
        })
    })
}