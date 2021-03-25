<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`http://localhost:8000/api/data/shots/distinct/players`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
		const players = await res.json();

		if (res.status === 200) {
			return { players };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>
<script>
  export let players;
  import VirtualList from '@sveltejs/svelte-virtual-list'
  import PlayerListItem from '@components/nba/players/playerListItem.svelte'
  let start;
  let end;
</script>
<style>
* {
    box-sizing: border-box;
}
.container {
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  min-height: 200px;
  height: calc(60vh - 15em);
}
</style>
<div class='container'>
<VirtualList items={players} bind:start bind:end let:item>
  <PlayerListItem {...item}/>
</VirtualList>
<p>showing players {start}-{end}</p>
</div>