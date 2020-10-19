<script>
  import { getContext } from 'svelte';
  import NewCat from './NewCat.svelte';

  const { open } = getContext('simple-modal');

  const showNewCat = () => {
    open(NewCat);
  };
</script>
<style>
	section {
		padding-top: 0.5em;
	}
</style>
<section>
  <button on:click={showNewCat}>Add Category</button>
</section>
