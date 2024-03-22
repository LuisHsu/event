import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = Express();
const httpServer = createServer(app);
const io = new Server(httpServer);



httpServer.listen(5050, () => {
    console.log("Server listening on port 5050");
})