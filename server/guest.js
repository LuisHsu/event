import { guest_token } from "../constants.mjs";
import { list_guest } from "./host.js";
import Guest from "./model/guest.js";

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

function GuestAPI(io){
    io.of("guest")
    .use(auth)
    .on('connection', socket => {
        const {id, name} = socket.handshake.auth;
        Guest.update({name, online: true}, {where: {id}})
        .then(() => {
            console.log(`Guest ${id} connected`)
            list_guest()

            socket.on('disconnect', (reason) => {
                Guest.update({online: false}, {where: {id}})
                .then(() => {
                    console.log(`Guest ${id} disconnect: ${reason}`)
                    list_guest();
                })
            })
        })
    })
}

export default GuestAPI;