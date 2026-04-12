const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

let dataList = [];

console.log("WebSocket server started on port 3000");

server.on('connection', (socket) => {
    console.log("New client connected");

    socket.on('message', (message) => {
        const data = JSON.parse(message.toString());

        // listeye ekle
        dataList.push(data);

        // son 10 veriyle sınırla
        if (dataList.length > 10) {
            dataList.shift();
        }

        // ortalama hesapla
        let totalTemp = 0;
        let totalHum = 0;

        dataList.forEach(d => {
            totalTemp += parseFloat(d.temperature);
            totalHum += parseFloat(d.humidity);
        });

        const avgTemp = (totalTemp / dataList.length).toFixed(2);
        const avgHum = (totalHum / dataList.length).toFixed(2);

        console.log("---- ANALYSIS ----");
        console.log("Last Data:", data);
        console.log("Average Temp:", avgTemp);
        console.log("Average Humidity:", avgHum);

        // uyarı sistemi
        if (data.temperature > 28) {
            console.log("⚠️ HIGH TEMPERATURE ALERT!");
        }

        console.log("------------------");
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});
