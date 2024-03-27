import io from "socket.io-client"
import {host_token, ws_server} from "./constants"

const socket = io(`${ws_server}/host`, {
    auth:{
        token: host_token
    }
})

socket.on('connect', () => {
    console.log(`Socket connected with ID: ${socket.id}`)
})

export function display_url(url){
    socket.emit("display_url", url)
}
