const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://yalcingulsen23_db_user:fener123@admin.xbs3ujd.mongodb.net/?appName=admin';
const client = new MongoClient(uri);

const server = new WebSocket.Server({ port: 3000 });

let dataList = [];
let sensorCollection;

async function sendToAWS(data, avgTemp, avgHum) {
    try {
        const response = await fetch('https://pkvz3qab5a.execute-api.eu-north-1.amazonaws.com/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sensorData: data,
                analysis: {
                    averageTemperature: avgTemp,
                    averageHumidity: avgHum
                }
            })
        });

        const result = await response.text();
        console.log("Sent to AWS:", result);
    } catch (error) {
        console.error("AWS send error:", error.message);
    }
}

async function startApp() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        console.log("Connected to AWS endpoint ready");

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

                    await sendToAWS(data, avgTemp, avgHum);

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
        console.error("Startup error:", error);
    }
}

startApp();
