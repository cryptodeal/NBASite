<script>
  export let tabs;
  import Image from 'svelte-image'; 
	let activeTab = 0;
	$: activeComponent = tabs[activeTab].component;
	//$: backpack = tabs[activeTab].backpack
</script>

<style>
	span {
		padding: 20px;
		cursor: pointer;
		user-select: none;
	}
	span.active {
		border-bottom: 1px solid #d74e4d;
		cursor: auto;
  }
  .binder {
    margin-bottom: 3em;
  }
  .titles {
    text-align: center;
    height: auto;
  }
  .logo{
    width: 50%;
    align-content: center;
  }
  flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
  }
</style>

<div class=binder>
  <div class=titles>
    {#each tabs as {name}, i}
      <span 
        class='{activeTab === i ? 'active' : ''}'
        on:click={() => activeTab = i}
      >{name}</span>
    {/each}
  </div>
</div>
<flex-container>
  <div class='logo'>
    <Image src='tnn.png' alt='TNN logo small'/>
  </div>
      <!-- <svelte:component this={activeComponent} {backpack} /> -->
  <svelte:component this={activeComponent} />
</flex-container>
