// writable are the simplest form of stores
import { writable } from 'svelte/store'
import Sockette from 'sockette'

const webSock = () => {
  let socket = new Sockette('ws://localhost:8000/ws', {
    //protocols: data.ticket,
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => console.log('Connected!', e),
    onmessage: e => {
      var data = JSON.parse(e.data);
      messages.update(messages => [...messages, data])
    },
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => console.log('Closed!', e),
    onerror: e => console.log('Error:', e)
  });

  // our temperature is now a store with initial value 0
  const messages = writable(['initial message']);

  // now we don't need to change this function, the change will be propaged
  // by the store itself
  const getMessages = () => {
    return messages;
  }

  const sendMessage = (message) => {
    if (socket.readyState <= 1) {
      socket.send(message);
    }
  }

  // ... rest of the code

  return { getMessages, sendMessage };
};

export default webSock;
