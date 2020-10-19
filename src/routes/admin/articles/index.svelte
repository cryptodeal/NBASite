<script context="module">
  export function preload({ params, query }) {
		return this.fetch(`admin/articles.json`).then(r => r.json()).then(articles => {
			return { articles };
		});
	}
</script>

<script>
    export let articles;
    import Sidebar from '@/components/admin/Sidebar.svelte'
    import { goto, stores } from '@sapper/app'
    import Content from '../../../components/NewArticleContent.svelte'
    import Modal from 'svelte-simple-modal'
    let sidebar_show = false;
    let artmodal_show = false;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
  }
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
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<main>
  <div class="row">

    <div class='side'>
      <Sidebar bind:show={sidebar_show}/>
    </div>
    <div class="column1">
      <button class="openbtn" on:click={() => sidebar_show = !sidebar_show}>☰ Open Sidebar</button>
    </div>
    <div class="column2">
        <h1>Recent articles</h1>
          <Modal>
            <Content />
          </Modal>
          <ul>
            {#each articles as article}
              <li><a rel='prefetch' href='admin/articles/edit/{article.slug}'>{article.title}</a></li>
            {/each}
          </ul>
    </div>
  </div>
</main>
