<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`http://localhost:8000/api/articles?pg=1`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
		const data = await res.json();

		if (res.status === 200) {
			return { newBatch: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>
<script>
  import { onMount } from "svelte";
  import InfiniteScroll from "svelte-infinite-scroll";
  import dayjs from 'dayjs'
  let page = 1;
  // store all the data here.
	let data = [];
	// store the new batch of data here.
  export let newBatch = [];
  
  async function fetchData() {
		const response = await fetch(`http://localhost:8000/api/articles?pg=${page}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      });
		newBatch = await response.json();
		console.log(newBatch)
  };
  
	//onMount(()=> {
		// load first batch onMount
	//	fetchData();
	//})

  $: data = [
		...data,
    ...newBatch
  ];
</script>
<svelte:head>
	<title>Blog</title>
</svelte:head>
<style>
  ul {
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    width: 100%;
    max-width: 100%;
    max-height: 350px;
		background-color: white;
    overflow-x: scroll;
    list-style: none;
    padding: 0;
  }
</style>

<h1>All Articles</h1>
  <ul>
    {#each data as post}
      <h2><a sapper:prefetch href='articles/{post.slug}'>{post.title}</a></h2>
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
    <InfiniteScroll
      hasMore={newBatch.length}
      threshold={100}
      on:loadMore={() => {page++; fetchData()}} />
  </ul>