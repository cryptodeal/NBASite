<script>
  import {socket} from '../../components/ws/socketStore'
  import Sidebar from '../../components/admin/Sidebar.svelte'
  let sidebar_show = false;
  function wsTest(){
    $socket.json({message: `test~!!!`})
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }
  .row {
    display: flex;
  }
  .column1 {
    height: 100%;
    flex: 15%;
    padding: 10px;
  }
  .column2 {
    flex: 85%;
    padding: 10px;
  }
  .openbtn {
    font-size: 13px;
    cursor: pointer;
    background-color: #d74e4d;
    color: white;
    padding: 10px 15px;
    border: none;
  }
  .side {
    display: grid;
		grid-template-rows: 100vh;
  }
</style>

<div class="row">
  <div class='side'>
    <Sidebar bind:show={sidebar_show}/>
  </div>
  <div class="column1">
    <button class="openbtn" on:click={() => sidebar_show = !sidebar_show}>☰ Open Sidebar</button>
  </div>
  <div class="column2">
    <button id="socketTest" type="button" on:click={wsTest}>Test ws.send()</button>
    <slot></slot>
  </div>
</div>
