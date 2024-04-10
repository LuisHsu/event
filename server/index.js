import Express from "express";
import BodyParser from "body-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

import { host_token } from "../constants.mjs";
import HostAPI from "./host.js";
import DisplayAPI from "./display.js";
import GuestAPI from "./guest.js";
import QuestionAPI from "./question.js";
import SpeakerAPI from "./speaker.js";

const app = Express();
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
GuestAPI(io);
QuestionAPI(app);
SpeakerAPI(io);

httpServer.listen(5050, '0.0.0.0', () => {
    console.log("Server listening on port 5050");
})