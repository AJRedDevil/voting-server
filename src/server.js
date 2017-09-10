import Server from 'socket.io';

let PORT = 8090;
const startServer = (store) => {
    const io = new Server().attach(PORT);
    console.log('RUNNING in port: ', PORT);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
};

export default startServer;