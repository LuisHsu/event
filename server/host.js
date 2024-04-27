import { host_token } from "../constants.mjs";
import { clear_timer, display_categories, show_question, fullscreen, select_category, set_timer, show_url, show_answer } from "./display.js";
import Guest from "./model/guest.js";
import Question from "./model/question.js";
import { start_question as guest_start_question, end_question as guest_end_question} from "./guest.js";
import { set_speaker, start_question as speaker_start_question } from "./speaker.js";
import { reset_used } from "./question.js";

let host_socket = null;

export function list_guest(){
    Guest.findAll().then(guests => guests.map(guest => guest.toJSON()))
    .then(guests => {
        if(host_socket != null){
            host_socket.emit("guest_list", guests)
        }
    })
}

function display_url(url) {
    show_url(url);
}

function add_guest(id) {
    Guest.findOne({where: {id}})
    .then(entry => {
        if(entry === null){
            Guest.create({id}).then(list_guest);
        }
    })
}

function delete_guest(id) {
    Guest.findOne({where: {id}})
    .then(entry => {
        if(entry !== null){
            return entry.destroy().then(list_guest)
        }
    })
}

function display_question(id){
    Question.findOne({where: {id}})
    .then(async question => {
        question.used = true;
        await question.save();
        return question;
    })
    .then(question => question.toJSON())
    .then(question => {
        show_question(question);
        guest_start_question(question);
        speaker_start_question(question);
    })
}

function end_question(){
    guest_end_question();
    show_answer();
}

function HostAPI (io) {
    io.of("host")
    .use((socket, next) => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == host_token)
        {
            next()
        }else{
            next(new Error("Bad request"))
        }
    })
    .on('connection', socket => {
        host_socket = socket;
        console.log("host connected")
        host_socket.on("get_guests", list_guest)
        host_socket.on("display_url", display_url)
        host_socket.on("add_guest", add_guest)
        host_socket.on("delete_guest", delete_guest)
        host_socket.on("fullscreen", fullscreen)
        host_socket.on("display_categories", display_categories)
        host_socket.on("select_category", select_category)
        host_socket.on("display_question", display_question)
        host_socket.on("set_timer", set_timer)
        host_socket.on("clear_timer", clear_timer)
        host_socket.on("set_speaker", set_speaker)
        host_socket.on("end_question", end_question)
        host_socket.on("reset_used", reset_used)
        host_socket.on('disconnect', (reason) => {
            console.log(`host disconnect: ${reason}`)
            host_socket = null;
        })
    })
    
}

export default HostAPI;