<script>
  import {stores} from '@sapper/app'
  import {LayerCake, Svg} from 'layercake';
  import Court from '../components/dataviz/svg/court.svelte';
  import Scatter from '../components/dataviz/svg/shotmap/scatter.svelte';
  import {points} from '../components/dataviz/test/points.js'
  const {session} = stores()

</script>
<style>
  .main-box {
    max-width: 56em;
  }
	.chart-container {
    width: 500px;
    height: 470px;
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

  <h2>Demo Shotmap (Some AD Shots '20-'21)</h2>
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
        <Scatter r={1.5} />
        <Court/>
      </Svg>
    </LayerCake>
  </div>
  {/if}
</div>

