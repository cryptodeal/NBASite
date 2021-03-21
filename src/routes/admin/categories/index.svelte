<script context="module">
    export function preload({ params, query }) {
		return this.fetch(`http://localhost:8000/api/admin/categories`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(r => r.json()).then(categories => {
			return { categories };
		});
	}
</script>
<script>
    export let categories;
    import Content from '@components/admin/categories/CatContent.svelte'
    import CatListItem from '@components/admin/categories/CatListItem.svelte'
    import VirtualList from '@sveltejs/svelte-virtual-list'
    import Modal from 'svelte-simple-modal'
    let nameSearch = '';
    $: filteredList = categories.filter(cat => cat.name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1);
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

<h1>Article Categories</h1>
<Modal>
  <Content />
</Modal>
<h3>Category Name: </h3> <input type='text' bind:value={nameSearch}/>
<div class='container'>
  <VirtualList items={filteredList} bind:start bind:end let:item>
    <Modal>
      <CatListItem {...item}/>
    </Modal>
  </VirtualList>
  <p>showing categories {start}-{end}</p>
</div>