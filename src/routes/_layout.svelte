<script>
  import Nav from "../components/Nav.svelte";
  import Image from "svelte-image";
  import routes from "../config/routes.js";
  import { guard } from "@beyonk/sapper-rbac";
  import { tick } from "svelte";
  import { stores, goto } from "@sapper/app";
  
  const { page, session } = stores();
  const options = {
    routes,
    deny: () => goto("/")
    // we don't specify grant here, since we don't need to do anything.
  };

  // Listen to the page store.
  page.subscribe(async v => {
    await tick(); // let the previous routing finish first.
    guard(v.path, $session.profile, options);
  });

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .logo-container {
		width: 100vw;
	  will-change: transform;
  }
  :global(.cool) {
    object-fit: scale-down;
  }
  
</style>
<div class='logo-container'>
  <Image src='title.png' alt="Tankie News Network logo"/>
</div>
<Nav {segment} />

{#if segment === 'admin'}
  <slot></slot>
{:else}
<main>
  <slot></slot>
</main>
{/if}

