import Express from "express";
import BodyParser from "body-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

import HostAPI from "./host.js";
import DisplayAPI from "./display.js";
import GuestAPI from "./guest.js";

const app = Express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "*"
    }
});

HostAPI(io);
DisplayAPI(io);
GuestAPI(io);

httpServer.listen(5050, () => {
    console.log("Server listening on port 5050");
})