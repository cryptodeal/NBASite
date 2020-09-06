<script context="module">
    export function preload({ params, query }) {
		return this.fetch(`admin/categories.json`).then(r => r.json()).then(categories => {
			return { categories };
		});
	}
</script>
<script>
    export let categories;
    import Sidebar from '../../../components/Sidebar.svelte'
    import Content from '../../../components/CatContent.svelte'
    import CatListItem from '../../../components/CatListItem.svelte'
    import VirtualList from '@sveltejs/svelte-virtual-list'
    import Modal from 'svelte-simple-modal'
    import { goto, stores } from '@sapper/app'
    let sidebar_show = false;
    let nameSearch = '';
    $: filteredList = categories.filter(cat => cat.name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1);
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
  <div class="row">
    <div class='side'>
      <Sidebar bind:show={sidebar_show}/>
    </div>
    <div class="column1">
      <button class="openbtn" on:click={() => sidebar_show = !sidebar_show}>☰ Open Sidebar</button>
    </div>
    <div class="column2">
        <h1>Article Categories</h1>
        <Modal>
          <Content />
        </Modal>
        <h3>Email: </h3> <input type='text' bind:value={nameSearch}/>
        <div class='container'>
          <VirtualList items={filteredList} bind:start bind:end let:item>
            <Modal>
              <CatListItem {...item}/>
            </Modal>
	        </VirtualList>
	        <p>showing users {start}-{end}</p>
        </div>
    </div>
  </div>
</main>

