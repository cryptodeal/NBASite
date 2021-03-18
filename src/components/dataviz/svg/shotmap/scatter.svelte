<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale, z } = getContext('LayerCake');

	export let r = 5;
	//export let fill = '#000';
	export let stroke = '#0cf';
	export let strokeWidth = 0;
	export let dx = 0;
	export let dy = 0;
</script>

<g class="scatter-group">
	{#each $data as d}
    {#if $z(d) === true}
      <circle
        cx={$xGet(d) + (typeof dx === 'function' ? dx($xScale) : dx)}
        cy={$yGet(d) + (typeof dy === 'function' ? dy($yScale) : dy)}
        {r}
        fill="green" 
        {stroke}
        stroke-width={strokeWidth}
      />
    {:else}
      <circle
          cx={$xGet(d) + (typeof dx === 'function' ? dx($xScale) : dx)}
          cy={$yGet(d) + (typeof dy === 'function' ? dy($yScale) : dy)}
          {r}
          fill="red" 
          {stroke}
          stroke-width={strokeWidth}
        />
    {/if}
	{/each}
</g>
