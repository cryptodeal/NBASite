<script>
	export let slug;
	export let name;
  $: fullName = name.fullName
</script>

<div class='card'>
	<h2><a href='data/shots/{slug}'>{fullName}</a></h2>
</div>

<style>
	.card {
		position: relative;
		margin: 0.5em;
		padding: 0.5em 0.5em 0.5em 6em;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
		min-height: 5em;
	}

	.card::after {
		clear: both;
		display: block;
	}

	h2 {
		margin: 0 0 0.5em 0;
		font-size: 16px;
	}

</style>