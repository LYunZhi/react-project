const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws')

const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  const count = wss.clients.size
  const color = ['red', 'blue', 'green', 'yellow', 'purple', 'pink']
  const selectedColor = color[Math.floor(Math.random() * Math.floor(6))]

// Send the online count of users to the client whenever a new client connects

wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({
      type: 'onlineCount',
      count
    }))
  }
})

// Listens to incoming data from client and returns data based on the type of data that comes in

ws.on('message', (data) => {
  const incomingData = JSON.parse(data)
  const dataType = incomingData.type
  let returnData;

  switch (dataType) {
    case 'addMessage':
      returnData = {
        id: uuidv4(),
        username: incomingData.username,
        content: incomingData.content,
        type: dataType,
        color: selectedColor
      }
      break;
    case 'changeName':
      const oldUsername = incomingData.oldUsername ? incomingData.oldUsername : 'Anonymous'
      returnData = {
        id: uuidv4(),
        type: dataType,
        username: incomingData.username,
        content: `${oldUsername} has changed their name to ${incomingData.username}`
      }
      break;
  }


  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(returnData))
      }
    })
  })

  // When the connection closes, send data again to the client to update the online users
  ws.on('close', () => {
    const count = wss.clients.size
    const returnData = {
      type: 'onlineCount',
      count
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(returnData))
      }
    })
    console.log('Client disconnected');
  });
});