import Express from "express";
import BodyParser from "body-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import cors from 'cors';

import { host_token, ssl_cert, ssl_key } from "../constants.mjs";
import HostAPI from "./host.js";
import DisplayAPI from "./display.js";
import GuestAPI from "./guest.js";
import QuestionAPI from "./question.js";
import SpeakerAPI from "./speaker.js";

const app = Express();
// const httpServer = createServer({
//     key: fs.readFileSync(ssl_key, 'utf8'),
//     cert: fs.readFileSync(ssl_cert, 'utf8')
// }, app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "*"
    }
});
app.use(cors())
app.use((req, res, next) => {
    const auth_header = req.get("Authorization")
    if(auth_header === `Basic ${host_token}`){
        next();
    }else{
        res.status(401).end("Unauthorized");
        next("Unauthorized");
    }
})
app.use(BodyParser.json())

HostAPI(io);
DisplayAPI(io);
GuestAPI(io, app);
QuestionAPI(app);
SpeakerAPI(io);

httpServer.listen(5050, '0.0.0.0', () => {
    console.log("Server listening on port 5050");
})