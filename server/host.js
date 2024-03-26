import { host_token } from "../constants.mjs";

let host_socket = null;

function display_url(url) {
    // TODO:
    console.log(url);
}

function HostAPI (io) {
    io.of("host").on('connection', socket => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == host_token)
        {
            host_socket = socket;
            host_socket.on("display_url", display_url)
        }else{
            socket.disconnect();
        }
    })
}

export default HostAPI;