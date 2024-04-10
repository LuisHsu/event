import { Sequelize } from "sequelize";
import { display_token } from "../constants.mjs";
import Question from "./model/question.js";
import { get_submits } from "./guest.js";

let display_socket = null;

export function show_url(url) {
    if(display_socket !== null){
        display_socket.emit("show_url", url);
    }else{
        console.error("no display")
    }
}

export function fullscreen(value) {
    if(display_socket !== null){
        display_socket.emit("fullscreen", value);
    }else{
        console.error("no display")
    }
}

export function select_category(value) {
    if(display_socket !== null){
        display_socket.emit("select_category", value);
    }else{
        console.error("no display")
    }
}

export function display_categories(){
    if(display_socket !== null){
        Question.findAll({
            attributes: ["category", [Sequelize.fn('COUNT', Sequelize.col('id')), "count"]],
            group:["category"],
            where: {used: false}
        })
        .then(categories => categories.map(cate => cate.toJSON()))
        .then(categories => {
            console.log(`show categories`)
            display_socket.emit("show_categories", categories);
        })
    }else{
        console.error("no display")
    }
}

export function show_question(question){
    if(display_socket !== null){
        console.log(`show question ${question.id}`)
        display_socket.emit("show_question", question);
    }else{
        console.error("no display")
    }
}

export function set_timer(time) {
    if(display_socket !== null){
        display_socket.emit("set_timer", time);
    }else{
        console.error("no display")
    }
}

export function clear_timer() {
    if(display_socket !== null){
        display_socket.emit("clear_timer");
    }else{
        console.error("no display")
    }
}

export function show_answer(){
    if(display_socket !== null){
        const submits = get_submits();
        console.log(submits);
        display_socket.emit("show_answer", Object.entries(submits).map(([_, v]) => v.size));
    }else{
        console.error("no display")
    }
}

export function show_choice(choice){
    if(display_socket !== null){
        display_socket.emit("show_choice", choice);
    }else{
        console.error("no display")
    }
}

function DisplayAPI (io) {
    io.of("display")
    .use((socket, next) => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == display_token)
        {
            next()
        }else{
            next(new Error("Bad request"))
        }
    })
    .on('connection', socket => {
        display_socket = socket;
        console.log("display connected")
        display_socket.on('disconnect', (reason) => {
            console.log(`display disconnect: ${reason}`)
            display_socket = null;
        })
    })
}

export default DisplayAPI;