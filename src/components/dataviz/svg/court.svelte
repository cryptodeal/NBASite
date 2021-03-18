<script>
	// Import the getContext function from svelte
  import { getContext } from 'svelte';
  import basketballCourt from 'basketball-court'
  // Access the context using the 'LayerCake' keyword
  // Grab some helpful functions
  const { width } = getContext('LayerCake');
	let court
  $: court = basketballCourt({
		width: $width,
		halfCourt: true,
		reverse: true
	}).toString()

	//export let fill = '#00bbff';
</script>
{@html court}