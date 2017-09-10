import Server from 'socket.io';

const startServer = () => {
    const io = new Server().attach(8090);
}

export default startServer;