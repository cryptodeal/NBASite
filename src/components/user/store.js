import { readable } from 'svelte/store';

const state = [
  'message #1 for test purposes ;))))',
  'message #2 for test purposes ;))))',
  'message #3 for test purposes ;))))'
];
export const messages = readable(state, (set) => {
  if (typeof WebSocket === 'undefined') return;

  let st = state;
  let socket = new WebSocket("ws://127.0.0.1:8000/ws");

  socket.onmessage = function (event) {
    st.push(event.data);
    set(st);
  };
  return () => {
    socket.close();
  };
});