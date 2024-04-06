import { speaker_token } from "../constants.mjs";
import { notify_speaker } from "./guest.js";

let speaker_socket = null;
let speaker = null;

export function set_speaker(id){
    speaker = id;
    notify_speaker(speaker);
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