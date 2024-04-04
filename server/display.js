import { Sequelize } from "sequelize";
import { display_token } from "../constants.mjs";
import Question from "./model/question.js";

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
    Question.findAll({
        attributes: ["category", [Sequelize.fn('COUNT', Sequelize.col('id')), "count"]],
        group:["category"],
        where: {used: false}
    })
    .then(categories => categories.map(cate => cate.toJSON()))
    .then(categories => {
        display_socket.emit("show_categories", categories);
    })
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