import io from "socket.io-client"
import {guest_token, ws_server} from "./constants.mjs"

let socket = null;

let handlers = {}

export function regist_handler(key, handler){
    handlers[key] = handler;
}

export function submit_answer(index){
    socket.emit("submit_answer", index);
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
            onLogin({id, username})
        })
        .on("connect_error", reject)

        socket.on("update_score", (data) => {
            if("update_score" in handlers){
                handlers["update_score"](data);
            }
        })

        socket.on("start_question", (data) => {
            if("start_question" in handlers){
                handlers["start_question"](data);
            }
        })

        socket.on("end_question", () => {
            if("end_question" in handlers){
                handlers["end_question"]();
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