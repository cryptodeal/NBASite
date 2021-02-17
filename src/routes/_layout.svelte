<script>
  import Nav from "../components/Nav.svelte";
  import Image from "svelte-image";
  import routes from "../config/routes.js";
  import { guard } from "@beyonk/sapper-rbac";
  import { tick, onMount } from "svelte";
  import { stores, goto } from "@sapper/app";
  import {socket} from '../components/ws/socketStore'
  const options = {
    routes,
    deny: () => goto("/")
    // we don't specify grant here, since we don't need to do anything.
  };
  const { page, session } = stores();
  // Listen to the page store.
  page.subscribe(async v => {
    await tick(); // let the previous routing finish first.
    guard(v.path, $session.profile, options);
  });
  console.log($socket)
  export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em;
    max-width: 56em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  :global(.ql-align-center) {
    text-align: center;
  }
  :global(.ql-align-justify) {
    text-align: justify;
  }
  :global(.ql-align-right) {
    text-align: right;
  }
  .logo-container {
		width: 100vw;
	  will-change: auto;
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

