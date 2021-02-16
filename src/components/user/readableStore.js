import { readable } from 'svelte/store'
import Sockette from 'sockette'
// a readable store with initial value 0
//
// we pass it a function; the first argument of the function will let us update
// the value when it changes
//
export const ws = readable(null, async set => {
  // this function is called once, when the first subscriber to the store arrives

  //simple check to prevent err in SSR (ws is not defined in node.js as it's native javascript)
  if (typeof WebSocket === 'undefined') return;

  //retrieve the websocket auth ticket
  let res = await fetch(`http://localhost:8000/api/auth/ws`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
  });
  let data = res.json()

  const ws = await new Sockette('ws://localhost:8000/ws', {
    protocols: data.ticket,
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => console.log('Connected!', e),
    onmessage: e => console.log('Received:', e.data),
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => console.log('Closed!', e),
    onerror: e => console.log('Error:', e)
  });

  //sets the value of the readable store to the websocket object
  await set(ws)

  const dispose = () => {
    socket.close()
  }
  // the function we return here will be called when the last subscriber
  // unsubscribes from the store (hence there's 0 subscribers left)
  return dispose
})