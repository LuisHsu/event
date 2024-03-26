
let host_socket = null;

function display_url(url) {
    // TODO:
    console.log(url);
}

function HostAPI (io) {
    io.of("host").on('connection', socket => {
        host_socket = socket;
        host_socket.on("display_url", display_url)
    })
}

export default HostAPI;