import { speaker_token } from "../constants.mjs";
import { notify_speaker } from "./guest.js";
import Guest from "./model/guest.js";

let speaker_socket = null;
export var speaker = null;

export function set_speaker(id){
    speaker = id;
    notify_speaker(speaker);
    Guest.findOne({where: {id}, attributes: ["id", "name"]})
    .then(guest => guest.toJSON())
    .then(guest => {
        speaker_socket.emit("set_speaker", guest);
    })
}

export function start_question(question){
    speaker_socket.emit("start_question", question);
}

function SpeakerAPI(io){
    io.of("speaker")
    .use((socket, next) => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == speaker_token)
        {
            next()
        }else{
            next(new Error("Bad request"))
        }
    })
    .on('connection', socket => {
        speaker_socket = socket;
        console.log("speaker connected")
        speaker_socket.on('disconnect', (reason) => {
            console.log(`speaker disconnect: ${reason}`)
            speaker_socket = null;
        })
    })
}

export default SpeakerAPI;