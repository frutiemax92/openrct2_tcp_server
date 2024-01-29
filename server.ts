/// <reference path="openrct2.d.ts" />
/// <reference path="command_reader.ts" />

class Server {
    listener : Listener;
    socket : Socket;
    commandReader : CommandReader;

    // first listen for any client
    constructor() {
        this.listener = network.createListener();
    }

    listen(port : number) {
        this.listener.listen(port);
        this.listener.on("connection", this.onConnect);
    }

    // ok, we have a client
    onConnect(socket : Socket) {
        console.log('connected');
        let commandReader = this.commandReader;

        socket.on("data", (data) => {
            // send back data to the client
            let commandReader = new CommandReader();
            let dataOut = commandReader.parseJson(data.slice(0, data.length - 3));
            dataOut = dataOut.concat("END")
            socket.write(dataOut);
        });

        socket.on("error", (hadError) => {
            console.log('onError');
        });

        socket.on("close", (hadError) => {
            console.log('onClose');
        });
    }

    onError(hadError : Boolean) {
        console.log('onError');
    }

    onClose(hadError : Boolean) {
        console.log('onClose');
    }

}