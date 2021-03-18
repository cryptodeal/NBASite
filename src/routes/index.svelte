<script>
  import {stores} from '@sapper/app'
  const {session} = stores()

</script>
<style>
  .main-box {
    max-width: 56em;
  }
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>
<div class="main-box">
  {#if $session.authenticated}
  <p>You are logged in as {$session.profile.name}</p>
  {:else}
  <p>Login to view authenticated routes</p>
  {/if}
</div>

