import { guest_token } from "../constants.mjs";
import { list_guest } from "./host.js";
import Guest from "./model/guest.js";

let guest_io = null;
let guests = {};
let answer_index = null;
var submits = {};

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
            if(entry !== null){
                next()
            }else{
                next(new Error("invalid ticket ID"))
            }
        })
    }else{
        next(new Error("Bad request"))
    }
}

export function start_question(question){
    submits = {};
    answer_index = question.answer_index;
    guest_io.of("guest").emit("start_question", question);
}

export function end_question(){
    Promise.all(Object.entries(submits).map(([index, submit_set]) => {
        let fields = ["answer_num"];
        if(index === answer_index.toString()){
            fields = ["answer_num", "correct_num", "score"];
        }
        return Guest.findAll({where: {id: [...submit_set]}})
        .then(entries => {
            entries.forEach(async entry => {
                await entry.increment(fields)
                await entry.reload()
                const {id, score} = entry.toJSON();
                guests[id].emit("update_score", score);
            })
        })
    }))
    .then(() => {
        guest_io.of("guest").emit("end_question");
    })
}

export function notify_speaker(id){
    guest_io.of("guest").emit("set_speaker", id);
}

function submit_answer(id, index){
    if(index in submits){
        submits[index].add(id);
    }else{
        submits[index] = new Set([id]);
    }
}

function GuestAPI(io){
    guest_io = io;
    io.of("guest")
    .use(auth)
    .on('connection', socket => {
        Guest.findOne({
            where: {id: socket.handshake.auth.id}
        })
        .then(guest => {
            const {id, name, score} = guest.toJSON()
            return guest.update({name, online: true})
            .then(() => {
                console.log(`Guest ${id} connected`)
                socket.emit("update_score", score);
                list_guest()
                guests[id] = socket;

                socket.on("submit_answer", submit_answer.bind(this, id))
                socket.on('disconnect', (reason) => {
                    Guest.update({online: false}, {where: {id}})
                    .then(() => {
                        console.log(`Guest ${id} disconnect: ${reason}`)
                        list_guest();
                        delete guests[id];
                    })
                })
            })
        })
    })
}

export default GuestAPI;