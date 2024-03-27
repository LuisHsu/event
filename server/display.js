import { display_token } from "../constants.mjs";

let display_socket = null;

export function show_url(url) {
    if(display_socket !== null){
        display_socket.emit("show_url", url);
    }else{
        console.error("no display")
    }
}

function DisplayAPI (io) {
    io.of("display").on('connection', socket => {
        if(socket.handshake.auth
            && socket.handshake.auth.token
            && socket.handshake.auth.token == display_token)
        {
            display_socket = socket;
            console.log("display connected")
            display_socket.on('disconnect', (reason) => {
                console.log(`display disconnect: ${reason}`)
                display_socket = null;
            })
        }else{
            socket.disconnect();
        }
    })
}

export default DisplayAPI;