<script>
  import { onMount } from "svelte";
  //import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import InfiniteScroll from "../../components/InfiniteScroll.svelte";
  import dayjs from 'dayjs'
  let page = 1;
  // store all the data here.
	let data = [];
	// store the new batch of data here.
  let newBatch = [];
  
  async function fetchData() {
		const response = await fetch(`api/articles/${page}.json`);
		newBatch = await response.json();
		console.log(newBatch)
  };
  
	onMount(()=> {
		// load first batch onMount
		fetchData();
	})

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
    <InfiniteScroll
      hasMore={newBatch.length}
      threshold={100}
      on:loadMore={() => {page++; fetchData()}} />
  </ul>