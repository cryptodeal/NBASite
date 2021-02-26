<script>
  import {setContext} from 'svelte'
  import {socket} from '../../components/ws/socketStore'
</script>

<slot socket={$socket}></slot>