# Realtime Data Streaming and Processing Project

## Project Description
This project is a real-time data streaming and processing application developed for the Cloud Computing course. In this project, sensor data is simulated and transmitted in real time using WebSocket technology. The incoming data is analyzed, stored in MongoDB, and sent to AWS for cloud-side processing.

## Technologies Used
- Node.js
- WebSocket (ws)
- MongoDB Atlas
- AWS Lambda
- AWS API Gateway
- Git & GitHub

## Project Features
- Real-time sensor data simulation
- WebSocket-based data transmission
- Temperature and humidity analysis
- High temperature alert system
- Data storage in MongoDB
- Cloud integration with AWS

## Project Workflow
1. A simulated client generates temperature and humidity data.
2. The client sends this data to the server through WebSocket.
3. The server receives and analyzes the incoming data.
4. The last 10 data points are used to calculate average temperature and humidity.
5. If temperature exceeds the threshold, an alert is produced.
6. The data is stored in MongoDB Atlas.
7. The same data is sent to AWS API Gateway and processed by AWS Lambda.

## Files
- client.js → Simulates IoT/sensor data
- server.js → Receives, analyzes, stores, and forwards data
- package.json → Project dependencies and metadata

## How to Run

### 1. Install dependencies
npm install

### 2. Start the server
node server.js

### 3. Start the client
node client.js

## Output
The system produces:
- Real-time incoming sensor data
- Average temperature and humidity values
- High temperature alerts
- MongoDB storage logs
- AWS transmission logs

## Purpose
The purpose of this project is to learn how real-time data can be collected, processed, analyzed, stored, and integrated with cloud technologies in a simple but practical way.
