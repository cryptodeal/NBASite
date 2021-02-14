import { writable } from 'svelte/store';
const messageStore = writable([]);

const initSocket = async () => {
  const output = {}
  const res = await fetch(`http://localhost:8000/api/auth/ws`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
  const data = await res.json()
  const socket = await new WebSocket('ws://127.0.0.1:8000/ws', data.ticket);
  // Connection opened
  socket.addEventListener('open', function (event) {
    console.log("It's open");
  });
  socket.addEventListener('ping', function (event) {
    console.log("ping");
  });
  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log(event.data)
    messageStore.update(currentVal => currentVal.push(event.data));
  });
  output.socket = socket;
  const sendMessage = (message) => {
    if (socket.readyState <= 1) {
      socket.send(message);
    }
  }
  output.send = sendMessage
}
const socket = initSocket()
//
const sendMessage = (message) => {
  if (socket.readyState <= 1) {
    socket.send(message);
  }
}

export default {
  subscribe: messageStore.subscribe,
  sendMessage
}