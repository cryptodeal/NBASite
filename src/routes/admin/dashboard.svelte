<script>
  import { goto, stores } from '@sapper/app'
  import Sidebar from '@/components/admin/Sidebar.svelte'
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  let n;
  let sidebar_show = false;
  //TODO: figure out best way to import css from node module for the editor, which is created onMount
  const { session } = stores()
  function upload (e){
    const file = e.target.files[0]
    const fd = new FormData();
    fd.append('sampleFile', file);
    return fetch('api/content/images/picture', {
      method: 'POST',
      body: fd
    }).then(res => {
      return res.status === 400 ? notifier.danger(`File not sent in upload`)
      : res.status === 500 ? notifier.danger(`Upload failed`)
      : notifier.success(`Upload successful`)
    });
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
    </div>
  </div>
</main>