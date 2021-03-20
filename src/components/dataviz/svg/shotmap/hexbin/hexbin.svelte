<script>
  import { getContext } from 'svelte';
	//import {scaleQuantile, scaleQuantize} from 'd3-scale'
	import {hexbinConfig} from './hexbinConfig.js'
	import * as d3Hexbin from 'd3-hexbin';
  const { data, x, xScale, y, yScale, z, width, height } = getContext('LayerCake');
	let heatScale = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];
	
  const calcRadiusScale = (allHexbinPoints) => {
		var hexbinPoints = [];
		var hexbinQuantities = [];
		for (var i = 0, l = allHexbinPoints.length; i < l; ++i) {
			var pts = allHexbinPoints[i];
			var numPts = 0;
			for (var j = 0, jl = pts.length; j < jl; ++j) {
				numPts++;
			}
			if (numPts > hexbinConfig.hexagonBinVisibleThreshold) hexbinPoints.push(pts);
			if (numPts > hexbinConfig.hexagonRadiusThreshold) hexbinQuantities.push(numPts);
		}
		let min = Math.min(...hexbinQuantities)
		let max = Math.max(...hexbinQuantities)
		let rangeScale = (max - min)/3
		return [min,min+rangeScale, min+rangeScale*2, max]
	}
	const calcHexRadius = (radiusScale,bin) => {
		if(bin.length <= radiusScale[0]) return hexbinConfig.hexagonRadiusSizes[0]
		if(bin.length > radiusScale[0] && bin.length <= radiusScale[1]) return hexbinConfig.hexagonRadiusSizes[1]
		if(bin.length > radiusScale[1]) return hexbinConfig.hexagonRadiusSizes[2]
	}
	const calcHeatscale = (bin) => {
		let made = 0;
		bin.map(shot => {
			if(shot[2] == true) ++made
		})
		let efficiency = made/bin.length
		if(efficiency <= .20) return heatScale[0]
		if(efficiency > .20 && efficiency <= .40) return heatScale[1]
		if(efficiency > .40 && efficiency <= .60) return heatScale[2]
		if(efficiency > .60 && efficiency <= .80) return heatScale[3]
		if(efficiency > .80) return heatScale[4]
	}

	$: hexbin = d3Hexbin
			.hexbin()
			.size([$width, $height])
      .radius(hexbinConfig.hexagonRadius)
	$: allHexbins = hexbin($data.map(d => [$xScale($x(d)),$yScale($y(d)), d.z]))
	$: radiusScale = calcRadiusScale(allHexbins)

</script>
	<g>
		{#each allHexbins as bin}
			<path d="M{bin.x},{bin.y}{hexbin.hexagon(calcHexRadius(radiusScale,bin))}" fill={calcHeatscale(bin)} fill-opacity='.7'/>
		{/each}
	</g>
