<script>
import { fly } from 'svelte/transition';
//import Modal from './Modal.svelte';

export let show = false;
let modal_show = false;
</script>
<style>
nav {
  position: fixed;
  top: inherit;
  left: 0;
  height: auto;
  border-right: 1px solid #aaa;
  overflow-y: auto;
	width: 10rem;
  background-color: #d74e4d;
  display: flex;
	flex-direction: column;
	overflow-y: auto;
	color: #e1ffff;
  z-index: 5;
}
.tabs a{
  text-decoration: none;
  display: block;
  padding: 5px 10px;
  font-size: 15px;
  color: white;
}
.tabs .closebtn{
  font-size: 20px;
  position: absolute;
  right: 5px;
  background-color: #d74e4d;
  border: none;
  color: white;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}
</style>

{#if show}
  <nav transition:fly={{x: -250, opacity: 1}}>
    <div class='tabs'>
      <button class='closebtn' on:click={() => show = !show}>x</button>
      <a href='admin/dashboard' on:click={() => show = !show}>Dashboard</a>
      <a rel='prefetch' href="admin/articles" on:click={() => show = !show}>Articles</a>
      <a rel='prefetch' href="admin/categories" on:click={() => show = !show}>Categories</a>
      <a rel='prefetch' href="admin/users" on:click={() => show = !show}>Manage Users</a>
      <a rel='prefetch' href="admin/apps" on:click={() => show = !show}>User Apps</a>
    </div>
  </nav>
{/if}

