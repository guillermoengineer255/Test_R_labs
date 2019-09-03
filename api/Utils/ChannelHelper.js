    
import socketIo from 'socket.io';

class ChannelHelper{
    
    constructor(server, citiesHelper){
        this.io = socketIo(server);
        this.citiesHelper = citiesHelper;
        this.startChannel = this.startChannel.bind(this);
    }

    startChannel(){
        let interval = null;
        this.io.on("connection", socket => {
            console.log("Nuevo Cliente Conectado");
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(
                async () => {
                    let data = await this.citiesHelper.getCitiesForecast();
                    socket.emit("Actuazalición de datos", data );
                }, 10000);

            socket.on("disconnect", () => {
                console.log("Cliente desconectado");
            });
        });
    }

}

module.exports(ChannelHelper);