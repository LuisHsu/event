import io from "socket.io-client"
import {guest_token, ws_server} from "./constants.mjs"

let socket = null;

export function login(id, username){
    return new Promise((resolve, reject) => {
        socket = io(`${ws_server}/guest`, {
            auth:{
                token: guest_token,
                id, name: username
            }
        })
        .on("connect", resolve)
        .on("connect_error", reject)
    })
}