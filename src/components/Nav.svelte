<script>
  import { stores } from '@sapper/app'
  import Modal from 'svelte-simple-modal'
  import Content from './UserContent.svelte'
  const { session } = stores()
  export let segment
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		justify-content: space-between;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
	li {
		display: block;
		float: left;
	}
	[aria-current] {
		position: relative;
		display: inline-block;
	}
	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #d74e4d;
		display: block;
		bottom: -1px;
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
  }
</style>

<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "articles" ? "page" : undefined}' sapper:prefetch href='articles'>articles</a></li>
    	{#if $session.authenticated}
      		<li><a aria-current='{segment === "profile" ? "page" : undefined}' sapper:prefetch href='profile'>profile</a></li>
      	{#if $session.profile.scope.includes('owner')}
        	<li><a aria-current='{segment === "organisation" ? "page" : undefined}' href='organisation'>my organisation</a></li>
      	{:else if $session.profile.scope.includes('admin')}
        	<li><a aria-current='{segment === "admin" ? "page" : undefined}' href='admin/dashboard'>admin dashboard</a></li>
      {/if}
    {/if}
	</ul>
  <ul>
	{#if !$session.authenticated}
    <li>
      <Modal>
        <Content/>
      </Modal>
    </li>
    {/if}
    {#if $session.authenticated}
    <li><a href='logout'>log out</a></li>
    {/if}
  </ul>
</nav>
