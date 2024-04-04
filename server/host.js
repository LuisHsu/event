import { host_token } from "../constants.mjs";
import { display_categories, fullscreen, select_category, show_url } from "./display.js";
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

function add_guest(id) {
    Guest.findOne({where: {id}})
    .then(entry => {
        if(entry === null){
            Guest.create({id}).then(list_guest);
        }
    })
}

function delete_guest(id) {
    Guest.findOne({where: {id}})
    .then(entry => {
        if(entry !== null){
            return entry.destroy().then(list_guest)
        }
    })
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
        host_socket.on("add_guest", add_guest)
        host_socket.on("delete_guest", delete_guest)
        host_socket.on("fullscreen", fullscreen)
        host_socket.on("display_categories", display_categories)
        host_socket.on("select_category", select_category)
        host_socket.on('disconnect', (reason) => {
            console.log(`host disconnect: ${reason}`)
            host_socket = null;
        })
    })
    
}

export default HostAPI;