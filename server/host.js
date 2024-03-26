
let host_socket = null;

function HostAPI (io) {
    io.of("host").on('connection', socket => {
        host_socket = socket;
        socket.on("display", (url) => {
            console.log("url");
        })
    })
}

export default HostAPI;