import Sockette from 'sockette'

export const createSocket = async (parsedTicketResponse) => {
  return new Sockette('ws://localhost:8000/ws', {
    protocols: parsedTicketResponse.ticket,
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => console.log('Connected!', e),
    onmessage: e => console.log('Received:', e.data),
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => console.log('Closed!', e),
    onerror: e => console.log('Error:', e)
  });

}