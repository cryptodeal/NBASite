<script>
  import { getContext } from 'svelte';
  import NewArticle from './NewArticle.svelte';

  const { open } = getContext('simple-modal');

  const showNewArticle = () => {
    open(NewArticle);
  };
</script>
<style>
	section {
		padding-top: 0.5em;
	}
</style>
<section>
  <button on:click={showNewArticle}>New Article</button>
</section>
