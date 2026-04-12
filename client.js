const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

socket.on('open', () => {
    console.log("Connected to server");

    setInterval(() => {
        const data = {
            temperature: (20 + Math.random() * 10).toFixed(2),
            humidity: (40 + Math.random() * 20).toFixed(2),
            time: new Date().toISOString()
        };

        socket.send(JSON.stringify(data));
        console.log("Sent:", data);
    }, 2000);
});


