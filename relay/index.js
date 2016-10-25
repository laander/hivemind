/**
 * Relay
 */

import express from 'express'
import http from 'http'
import path from 'path'
import socketio from 'socket.io'
import * as orchestrator from '../world/orchestrator'
import * as logger from '../world/logger'

let app = express()
let server = http.Server(app)
let io = socketio(server)
let clientDir = 'instrument/'

app.get('/', function (req, res) {
  res.sendFile(path.resolve(clientDir + 'index.html'))
})

io.on('connection', function (socket) {
  logger.log('Relay', 'a user connected')
  socket.on('chat message', function (msg) {
    logger.log('Relay', 'message received:', msg)
    let result = orchestrator[msg]()
    logger.log('Relay', 'message result:', result)
    if (msg === 'expose') io.emit('chat message', result)
  })
  socket.on('disconnect', function () {
    logger.log('Relay', 'a user disconnected')
  })
})

server.listen(8097, function () {
  logger.log('Relay', 'server running, listening on :8097')
})

export function init () {
  logger.log('Relay', 'loaded')
}
