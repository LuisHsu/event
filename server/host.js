import { host_token } from "../constants.mjs";
import { show_url } from "./display.js";
import Guest from "./model/guest.js";

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
        host_socket.on('disconnect', (reason) => {
            console.log(`host disconnect: ${reason}`)
            host_socket = null;
        })
    })
    
}

export default HostAPI;