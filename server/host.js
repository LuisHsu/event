import { host_token } from "../constants.mjs";
import { show_url } from "./display.js";

let host_socket = null;

function display_url(url) {
    show_url(url);
}

function HostAPI (io) {
    io.of("host")
    .on('connection', socket => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == host_token)
        {
            host_socket = socket;
            console.log("host connected")

            host_socket.on("display_url", display_url)
            host_socket.on('disconnect', (reason) => {
                console.log(`host disconnect: ${reason}`)
                host_socket = null;
            })
        }else{
            socket.disconnect();
        }
    })
    
}

export default HostAPI;