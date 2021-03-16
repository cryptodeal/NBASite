<script context='module'>
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
    // this file is called [slug].svelte
    return this.fetch(`http://localhost:8000/api/admin/apps`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(r => r.json()).then(apps => {
			return { apps };
		});
	}
</script>
<script>
    export let apps;
    import Modal from 'svelte-simple-modal'
    import Grid from 'svelte-grid-responsive'
    import VirtualList from '@sveltejs/svelte-virtual-list'
    import AppListItem from '../../../components/admin/apps/AppListItem.svelte'
    let emailSearch = '';
    let scopeSearch = '';
    let useritemlist_show = false;
	  $: filteredList = apps.filter(app => app.user.email.toLowerCase().indexOf(emailSearch.toLowerCase()) !== -1 && app.scope.toLowerCase().indexOf(scopeSearch.toLowerCase()) !== -1);
	  let start;
    let end;
</script>
<style>
  * {
      box-sizing: border-box;
  }
  .container {
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
		min-height: 200px;
		height: calc(60vh - 15em);
	}
</style>

<h1>Applications Pending Review</h1>
<Grid container gutter={12}>
  <Grid xs={12} md={4} lg={4}>
    <h3>Email: </h3> <input type='text' bind:value={emailSearch}/>
  </Grid>
  <Grid xs={12} md={4} lg={4}>
    <h3>Permissions: </h3>
    <select bind:value={scopeSearch}>
      <option value=''>-- Select User Type --</option>
      <option value='admin'>admin</option>
      <option value='user'>user</option>
    </select>
  </Grid>
  <Grid xs={0} md={4} lg={4}>
    <h3>Edit:</h3>
  </Grid>
</Grid>
<br/>
<div class='container'>
  <VirtualList items={filteredList} bind:start bind:end let:item>
    <Modal>
      <AppListItem {...item}/>
    </Modal>
  </VirtualList>
  <p>showing applications {start}-{end}</p>
</div>