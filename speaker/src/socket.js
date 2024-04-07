import io from "socket.io-client"
import {speaker_token, ws_server} from "./constants.mjs"

const socket = io(`${ws_server}/speaker`, {
    auth:{
        token: speaker_token
    }
})

let handlers = {}

export function regist_handler(key, handler){
    handlers[key] = handler;
}

export function submit_answer(index){
    socket.emit("submit_answer", index);
}

socket.on('connect', () => {
    console.log(`Socket connected with ID: ${socket.id}`)
})

socket.on('set_speaker', (speaker) => {
    if("set_speaker" in handlers){
        handlers["set_speaker"](speaker);
    }
})

socket.on('start_question', (question) => {
    if("start_question" in handlers){
        handlers["start_question"](question);
    }
})