const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://yalcingulsen23_db_user:fener123@admin.xbs3ujd.mongodb.net/?appName=admin';
const client = new MongoClient(uri);

const server = new WebSocket.Server({ port: 3000 });

let dataList = [];
let sensorCollection;

async function startApp() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("realtime_data");
        sensorCollection = db.collection("sensor_readings");

        console.log("WebSocket server started on port 3000");

        server.on('connection', (socket) => {
            console.log("New client connected");

            socket.on('message', async (message) => {
                try {
                    const data = JSON.parse(message.toString());

                    dataList.push(data);

                    if (dataList.length > 10) {
                        dataList.shift();
                    }

                    let totalTemp = 0;
                    let totalHum = 0;

                    dataList.forEach(d => {
                        totalTemp += parseFloat(d.temperature);
                        totalHum += parseFloat(d.humidity);
                    });

                    const avgTemp = (totalTemp / dataList.length).toFixed(2);
                    const avgHum = (totalHum / dataList.length).toFixed(2);

                    await sensorCollection.insertOne({
                        temperature: parseFloat(data.temperature),
                        humidity: parseFloat(data.humidity),
                        time: data.time,
                        receivedAt: new Date()
                    });

                    console.log("---- ANALYSIS ----");
                    console.log("Last Data:", data);
                    console.log("Average Temp:", avgTemp);
                    console.log("Average Humidity:", avgHum);
                    console.log("Saved to MongoDB");

                    if (parseFloat(data.temperature) > 28) {
                        console.log("⚠️ HIGH TEMPERATURE ALERT!");
                    }

                    console.log("------------------");
                } catch (error) {
                    console.error("Message processing error:", error);
                }
            });

            socket.on('close', () => {
                console.log("Client disconnected");
            });
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

startApp();
