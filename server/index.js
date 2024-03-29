import Express from "express";
import BodyParser from "body-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

import HostAPI from "./host.js";
import DisplayAPI from "./display.js";
import GuestAPI from "./guest.js";
import QuestionAPI from "./question.js";
import { host_token } from "../constants.mjs";

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
    if(auth_header !== `Basic ${host_token}`){
        res.status(401).end("Unauthorized");
        next("Unauthorized");
    }else{
        next();
    }
})
app.use(BodyParser.json())

HostAPI(io);
DisplayAPI(io);
GuestAPI(io);
QuestionAPI(app);

httpServer.listen(5050, () => {
    console.log("Server listening on port 5050");
})