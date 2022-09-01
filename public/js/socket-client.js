// HTML References
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const txtMessage = document.querySelector('#txtMessage')
const btnSend = document.querySelector('#btnSend')


// Client
const socket = io();

socket.on('connect', () => {
    // console.log('connected')

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    console.log('disconnected from the server')

    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

// Received Messages from Server
socket.on('send-msg', (payload, callback) => {
    const { msg } = payload
    console.log('Received:', msg)

    // Callback msg executing on the Server
    callback('Msg received...')
})

// Send Messages to Server
btnSend.addEventListener('click', () => {
    const msg = txtMessage.value

    const payload = {
        msg,
        id: '12345',
        date: new Date().getTime()
    }

    // Emit message to server
    socket.emit('send-msg', payload, () => {
        console.log('Received from Server')
    })

})