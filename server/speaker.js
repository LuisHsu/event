import { speaker_token } from "../constants.mjs";
import { show_choice } from "./display.js";
import { notify_speaker } from "./guest.js";
import Guest from "./model/guest.js";

let speaker_socket = null;
let speaker = null;
let speaker_choice = null;

export function get_speaker_info(){
    return {speaker, speaker_choice};
}

export function set_speaker(id){
    speaker = id;
    notify_speaker(speaker);
    if(id !== null){
        Guest.findOne({where: {id}, attributes: ["id", "name"]})
        .then(guest => guest.toJSON())
        .then(guest => {
            if(speaker_socket !== null){
                speaker_socket.emit("set_speaker", guest);
            }
        })
    }else{
        if(speaker_socket !== null){
            speaker_socket.emit("set_speaker", null);
        }
    }
}

export function start_question(question){
    if(speaker_socket !== null){
        speaker_socket.emit("start_question", question);
    }
}

function submit_answer(choice){
    speaker_choice = choice;
    show_choice(choice);
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
        speaker_socket.on("submit_answer", submit_answer);
        speaker_socket.on('disconnect', (reason) => {
            console.log(`speaker disconnect: ${reason}`)
            speaker_socket = null;
        })
    })
}

export default SpeakerAPI;