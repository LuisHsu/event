import { guest_token } from "../constants.mjs";
import { list_guest } from "./host.js";
import Guest from "./model/guest.js";

let guest_io = null

function auth(socket, next){
    if(socket.handshake.auth
        && socket.handshake.auth.token
        && socket.handshake.auth.token == guest_token
        && socket.handshake.auth.id
        && socket.handshake.auth.name
    ){
        Guest.findOne({
            where: {id: socket.handshake.auth.id}
        })
        .then(entry => {
            if(entry !== null){
                next()
            }else{
                next(new Error("invalid ticket ID"))
            }
        })
    }else{
        next(new Error("Bad request"))
    }
}

export function display_question(question){
    guest_io.of("guest").emit("show_question", question);
}

function GuestAPI(io){
    guest_io = io;
    io.of("guest")
    .use(auth)
    .on('connection', socket => {
        const {id, name} = socket.handshake.auth;
        Guest.update({name, online: true}, {where: {id}})
        .then(() => {
            console.log(`Guest ${id} connected`)
            list_guest()
            socket.join(id)
            socket.on('disconnect', (reason) => {
                Guest.update({online: false}, {where: {id}})
                .then(() => {
                    console.log(`Guest ${id} disconnect: ${reason}`)
                    list_guest();
                    socket.leave(id)
                })
            })
        })
    })
}

export default GuestAPI;