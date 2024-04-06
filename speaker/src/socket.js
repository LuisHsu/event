import io from "socket.io-client"
import {guest_token, ws_server} from "./constants.mjs"

let socket = null;

export function login(id, username, onLogin = () => {}, onLogout = () => {}){
    return new Promise((resolve, reject) => {
        if(socket !== null){
            socket.disconnect()
            socket = null;
        }
        socket = io(`${ws_server}/guest`, {
            auth:{
                token: guest_token,
                id, name: username
            }
        })
        .on("connect", () => {
            resolve()
            onLogin(id, username)
        })
        .on("connect_error", reject)

        socket.on("disconnect", () => {
            onLogout();
        })
    })
}