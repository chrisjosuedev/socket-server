const socketController = (socket) => {
    
    console.log('client connected', socket.id);

    // Check if client is disconnected
    socket.on('disconnect', () => {
        console.log('client disconnected', socket.id);
    });

    // Listen msg [(send-msg): name of event] from Client
    socket.on('send-msg', (payload, callback) => {

        /**  
            Send Confirmation to Client who send Message to Server, you can 
            receive params to callback.
        */
        callback();

        /**  Receive a msg and send it to all Clients Connected, except who send it
                .broadcast -> Send msg to all conected clients
        */

        socket.broadcast.emit('send-msg', payload, (err, response) => {
            if (err) return 'Something wrong...';
            return console.log(response);
        });
    });
};

module.exports = {
    socketController,
};
