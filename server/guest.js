import { guest_token } from "../constants.mjs";
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
            const {id, name} = socket.handshake.auth;
            if(entry !== null){
                Guest.update({name}, {
                    where: {id}
                })
                .then(() => {
                    console.log(`Guest ${id} login`)
                    next()
                })
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
        // if(socket.handshake.auth
        //     && socket.handshake.auth.token
        //     && socket.handshake.auth.token == guest_token)
        // {
        //     host_socket = socket;
        //     console.log("host connected")

        //     host_socket.on("display_url", display_url)
        //     host_socket.on('disconnect', (reason) => {
        //         console.log(`host disconnect: ${reason}`)
        //         host_socket = null;
        //     })
        // }else{
        //     socket.disconnect();
        // }
    })
}

export default GuestAPI;