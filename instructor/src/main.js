import Vue from 'vue'
import App from './App'
import io from 'socket.io-client'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

var socket = io()

socket.on('chat message', function (msg) {
  console.log(msg)
})
