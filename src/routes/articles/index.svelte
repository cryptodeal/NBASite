<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`articles.json`).then(r => r.json()).then(posts => {
      console.log(posts)
			return { posts };
		});
	}
</script>

<script>
  import dayjs from 'dayjs'
	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>All Articles</h1>
	{#each posts as post}
		<h2><a rel='prefetch' href='articles/{post.slug}'>{post.title}</a></h2>
    <p style='text-muted'>Published
      {#if post.date}
        on {dayjs(post.date).format('MMM. D, YYYY')} 
      {/if}
      {#if post.categories && post.categories.length}
        in {#each post.categories as cat, j}
          {#if j == 0}
            <a href='/articles/{cat.key}'>{cat.name}</a>
          {:else}
            , <a href='/articles/{cat.key}'>{cat.name}</a>
          {/if}
        {/each}
      {/if}
      {#if post.author.length}
        by {#each post.author as aut, i}
          {#if i == 0}
            <a href='/contributors/{aut.userkey}'>{aut.email}</a>
          {:else}
            , <a href='/contributors/{aut.userkey}'>{aut.email}</a>

          {/if}
        {/each}
      {/if}
    </p>
	{/each}