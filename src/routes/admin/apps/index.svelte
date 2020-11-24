<script context='module'>
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
    // this file is called [slug].svelte
    return this.fetch(`admin/apps.json`).then(r => r.json()).then(apps => {
			return { apps };
		});
	}
</script>
<script>
    export let apps;
    import Modal from 'svelte-simple-modal'
    import Grid from 'svelte-grid-responsive'
    import Sidebar from '../../../components/admin/Sidebar.svelte'
    //import VirtualList from '@sveltejs/svelte-virtual-list'
    //import UserListItem from '../../../components/admin/users/UserListItem.svelte'
    import { goto, stores } from '@sapper/app'
    let sidebar_show = false;
    let emailSearch = '';
    let scopeSearch = '';
    let useritemlist_show = false;
	  //$: filteredList = apps.filter(app => app.email.toLowerCase().indexOf(emailSearch.toLowerCase()) !== -1 && app.scope.toLowerCase().indexOf(scopeSearch.toLowerCase()) !== -1);
	  let start;
    let end;
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
      padding: 10px;
      height: 100%;
      flex: 15%;
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
  .container {
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
		min-height: 200px;
		height: calc(60vh - 15em);
	}
</style>

<main>
  <div class='row'>
    <div class='side'>
      <Sidebar bind:show={sidebar_show}/>
    </div>
    <div class='column1'>
      <button class='openbtn' on:click={() => sidebar_show = !sidebar_show}>☰ Open Sidebar</button>
    </div>
    <div class='column2'>
      <h1>Applications Pending Review</h1>
        {#each apps as app}
          <p>{app.user.email}</p>
        {/each}
    </div>
  </div>
</main>