<script>
  //import {stores} from '@sapper/app'
  import {onMount} from 'svelte';
  import Message from '../../components/user/message.svelte';
  import Sidebar from '../../components/admin/Sidebar.svelte'
  import {NotificationDisplay, notifier} from '@beyonk/svelte-notifications'
  import webSock from '../../components/ws/store'
  const ws = webSock();
  let message;
	let messages = [];
  let n;
  let sidebar_show = false;
  //const initialValue = {content: 'Initial message'};
  //TODO: figure out best way to import css from node module for the editor, which is created onMount
  //const { session } = stores()
  function upload (e){
    const file = e.target.files[0]
    const fd = new FormData();
    fd.append('sampleFile', file);
    return fetch('http://localhost:8000/api/content/images/picture', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: fd
    }).then(res => {
      return res.status === 400 ? notifier.danger(`File not sent in upload`)
      : res.status === 500 ? notifier.danger(`Upload failed`)
      : notifier.success(`Upload successful`)
    });
  }
  onMount(async () => {
    //const module = await import('../../components/ws/store');
		//websocketStore = module.default;
    //store.subscribe(currentMessage => {
		//		messages = [...messages, currentMessage];
		//})
    const test = ws.getMessages()
    console.log(test)
  });
  function onSendMessage() {
		if (message.length > 0) {
      webSock.sendMessage(message);
			message = "";
		}
	}

</script>
<style>
  * {
    box-sizing: border-box;
  }
  .row {
    display: flex;
  }
  main {
    position: relative;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
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

<main>
  <NotificationDisplay bind:this={n} />
  <div class="row">
    <div class='side'>
      <Sidebar bind:show={sidebar_show}/>
    </div>
    <div class="column1">
      <button class="openbtn" on:click={() => sidebar_show = !sidebar_show}>☰ Open Sidebar</button>
    </div>
    <div class="column2">
      <h1>Admin Dashboard</h1>
      <input on:change={upload} type='file' >
      <input type="text" bind:value={message} />
      <button on:click={onSendMessage(ws)}>
        Send Message
      </button>
      {#each messages as message, i}
          <Message {message} direction={i % 2 == 0 ? "left" :  "right" } />
      {/each}
    </div>
  </div>
</main>