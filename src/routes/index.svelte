<script>
	import {LayerCake, Svg}  from 'layercake';
	import Hexbin from '../components/dataviz/svg/shotmap/hexbin/hexbin.svelte'
	import Court from '../components/dataviz/svg/court.svelte'
	import {points} from '../components/dataviz/test/points.js'
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

<div class="dimensions-container">
  <div class="chart-container">
    <LayerCake
      ssr={true}
      x='x'
      y='y'
      z='z'
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

