<script>
  import {onMount} from 'svelte';
  export let myStore;

  onMount(async () => {
    //the ticket value is not changed unless user closes subscription 
    //
    //TODO: Ensure new ticket value is generated if old ticket expires
    const module = await import('svelte-websocket-store')
    return myStore = module.default;
    //myStore = websocketStore('ws://localhost:8000/ws', initialValue, [data.ticket]);
  })
</script>