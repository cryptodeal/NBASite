<script context="module">
  export async function preload({ params, query }) {
		return this.fetch(`http://localhost:8000/api/admin/articles`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(r => r.json()).then(articles => {
			return { articles };
		});
	}
</script>

<script>
    export let articles;
    import Content from '@components/NewArticleContent.svelte'
    import Modal from 'svelte-simple-modal'
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
  }
  * {
      box-sizing: border-box;
  }
</style>

<svelte:head>
	<title>Admin: Articles</title>
</svelte:head>

<h1>Recent articles</h1>
<Modal>
  <Content />
</Modal>
<ul>
  {#each articles as article}
    <li><a sapper:prefetch href='admin/articles/edit/{article.slug}'>{article.title}</a></li>
  {/each}
</ul>