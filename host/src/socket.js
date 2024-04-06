import io from "socket.io-client"
import {host_token, ws_server} from "./constants"

const socket = io(`${ws_server}/host`, {
    auth:{
        token: host_token
    }
})

export var guest_list = [];
var guest_updater = null;
export function register_guests(updater){
    guest_updater = updater;
}

socket.on("guest_list", guests => {
    guest_list = guests;
    if(guest_updater != null){
        guest_updater(guest_list);
    }
})
socket.on('connect', () => {
    console.log(`Socket connected with ID: ${socket.id}`)
    socket.emit("get_guests")
})

export function display_url(url){
    socket.emit("display_url", url)
}

export function fullscreen(value){
    socket.emit("fullscreen", value)
}

export function display_categories(){
    socket.emit("display_categories")
}

export function select_category(name){
    socket.emit("select_category", name)
}

export function display_question(id){
    socket.emit("display_question", id)
}

export function add_guest(id){
    socket.emit("add_guest", id)
}

export function delete_guest(id){
    socket.emit("delete_guest", id)
}

export function set_timer(time){
    socket.emit("set_timer", time)
}

export function clear_timer(){
    socket.emit("clear_timer")
}

export function set_speaker(id){
    socket.emit("set_speaker", id)
}
