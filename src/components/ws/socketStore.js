import { readable } from 'svelte/store'
import Sockette from 'sockette'
const state = {};
export const socket = readable(state, (set) => {
  if (typeof WebSocket === 'undefined') return;
  var ticket;
  if(ticket){
    set(new Sockette('ws://localhost:8000/ws', {
      protocols: ticket,
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => {
        console.log('Received Message: ', e)
        //TODO: handlers
        let json = JSON.parse(e.data);
        switch (json.action) {
          case 'auth': {
            /* receive auth ticket from server */
            console.log(`Case auth, ticket: ${json.ticket}`)
            ticket = json.ticket
            break;
          }
        }
      },
      //onreconnect re
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    }))
  } else {
    set(new Sockette('ws://localhost:8000/ws', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => {
        console.log('Received Message: ', e)
        //TODO: handlers
        let json = JSON.parse(e.data);
        switch (json.action) {
          case 'auth': {
            /* receive auth ticket from server */
            console.log(`Case auth, ticket: ${json.ticket}`)
            ticket = json.ticket
            break;
          }
          case 'receipt': {
            /* receive receipt of message from server */
            console.log(`Server confirmed received message: ${json.message}`)
            break;
          }
        }
      },
      //onreconnect re
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
  }))
}
  
});

const createSocket = (ticket) => {

}