<script>
  import { getContext } from 'svelte';
  import EditCat from './EditCat.svelte';
  export let name;
  export let _id;
  const { open } = getContext('simple-modal');

  const showEditCat = () => {
    open(EditCat, {_id: _id, name: name});
  };
</script>
<style>
	section {
		padding-top: 0.5em;
	}
  .modallink{
    cursor: pointer;
  }
</style>
<section>
  <a class='modallink' href={null} on:click={showEditCat}>{name}</a>
</section>
