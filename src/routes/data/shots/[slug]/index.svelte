<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`http://localhost:8000/api/data/shots/${params.slug}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
		const data = await res.json();

		if (res.status === 200) {
			return { points: data.points, player: data.player };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>
<script>
  export let points;
  export let player;
  import {LayerCake, Svg}  from 'layercake';
	import Hexbin from '@components/dataviz/svg/shotmap/hexbin/hexbin.svelte'
	import Court from '@components/dataviz/svg/court/index.svelte'
</script>
<style>
  .dimensions-container {
    position: relative;
    width: 100%;
    padding-bottom: 94%;
  }
	.chart-container {
    position: absolute;
    width: 100%;
    height: 100%;
	}
</style>
<h1>{player.name.fullName} Career Shotmap</h1>
<div class="dimensions-container">
  <div class="chart-container">
    <LayerCake
      ssr={true}
      x='locX'
      y='locY'
      z='madeShot'
      xDomain={ [-250, 250] }
      yDomain={ [-50, 420] }
      data={points}
    >
      <Svg>
        <!-- You can expose properties on your chart components to make them more reusable -->
        <Court/>
				<Hexbin/>
      </Svg>

    </LayerCake>
  </div>
</div>

