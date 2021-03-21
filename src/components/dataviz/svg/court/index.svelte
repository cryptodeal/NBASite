<script>
	import {getContext} from 'svelte'
	import {config} from './courtDimensions.js'
  const {width, height} = getContext('LayerCake');
	//shared scale
	$: scaleRatio = $width / 15.24
	//transform variables
	$: reverseWidth = $width / 2
	$: reverseHeight = $height / 2
	//rim variables
	$: rimRadius = config.rimRadius * scaleRatio
	$: rimCenterX = $width / 2
	$: rimCenterY = config.backboardDistanceFromBaseline * scaleRatio + config.rimDistanceFromBackboard * scaleRatio + rimRadius
	//backboard variables
	$: backboardWidth = config.backboardWidth * scaleRatio
	$: backboardX1 = ($width - backboardWidth) / 2
	$: backboardX2 = ($width + backboardWidth) / 2
	$: backboardY = config.backboardDistanceFromBaseline * scaleRatio
	//inner lane variables
	$: innerLaneWidth = config.ftCircleRadius * scaleRatio * 2
	$: innerLaneX = ($width - innerLaneWidth) / 2
	$: innerLaneHeight = config.laneLength * scaleRatio
	//rect lane variables
	$: rectLaneWidth = config.laneWidth * scaleRatio
	$: rectLaneHeight = config.laneLength * scaleRatio
	$: rectLaneX = ($width - rectLaneWidth) / 2
	//low/high free throw circle variables
	$: ftCircleArchRadius = config.ftCircleRadius * scaleRatio
	$: ftCircleArchX1 = ($width - config.ftCircleRadius * scaleRatio * 2) / 2
	$: ftCircleArchX2 = ftCircleArchX1 + ftCircleArchRadius * 2
	$: ftCircleArchY = config.laneLength * scaleRatio
	//low free throw cirlce variables
	$: ftCircleArchLowGap = Math.PI * ftCircleArchRadius / config.ftCircleDashCount
	//half court variables
	$: hcCircleRadius = config.centerCircleRadius * scaleRatio
	$: hcCircleX1 = $width / 2 - hcCircleRadius
	$: hcCircleX2 = $width - hcCircleX1
	//restrain circle variables
	$: restrainCircleRadius = config.restrainCircleRadius * scaleRatio
	$: restrainCircleX1 = $width / 2 - restrainCircleRadius
	$: restrainCircleX2 = $width - restrainCircleX1
	//three point line variables
	$: threePointLineRadius = config.tplineDistanceFromHoop * scaleRatio
	$: threePointLineX1 = $width / 2 - config.tplineDistanceFromHoopCorner * scaleRatio
	$: threePointLineX2 = $width - threePointLineX1
	$: threePointLineY2 = config.tplineSideLength * scaleRatio
	//restricted area variables
	$: restrictedAreaRadius = config.restrictedAreaRadius * scaleRatio
	$: restrictedAreaX1 = $width / 2 - restrictedAreaRadius
	$: restrictedAreaX2 = restrictedAreaX1 + restrictedAreaRadius * 2
	$: restrictedAreaY = backboardY + config.rimDistanceFromBackboard * scaleRatio + config.rimRadius * scaleRatio
</script>

<g fill='none' stroke='#000' transform="rotate(180 {reverseWidth} {reverseHeight})">
	<rect x="0" y="0" width="{$width}" height="{$height}"/>
	<!--drawing the rim-->
		<circle r="{rimRadius}" cx="{rimCenterX}" cy="{rimCenterY}"/>
	<!--drawing the backboard-->
		<line x1="{backboardX1}" y1="{backboardY}" x2="{backboardX2}" y2="{backboardY}"/>
	<!--drawing the inner lane-->
		<rect x="{innerLaneX}" y="0" width="{innerLaneWidth}" height="{innerLaneHeight}"/>
	<!--drawing the rect lane-->
		<rect x="{rectLaneX}" y="0" width="{rectLaneWidth}" height="{rectLaneHeight}"/>
	<!--drawing the low free throw circle arch-->
		<path d="M{ftCircleArchX1} {ftCircleArchY} A{ftCircleArchRadius} {ftCircleArchRadius} 0 0 1 {ftCircleArchX2} {ftCircleArchY}" stroke-dasharray="{ftCircleArchLowGap}"/>
	<!--drawing the high free throw circle arch-->
		<path d="M{ftCircleArchX1} {ftCircleArchY} A{ftCircleArchRadius} {ftCircleArchRadius} 0 0 0 {ftCircleArchX2} {ftCircleArchY}"/>
	<!--drawing the half court circle-->
		<path d="M{hcCircleX1} {$height} A{hcCircleRadius} {hcCircleRadius} 0 0 1 {hcCircleX2} {$height}Z"/>
	<!--drawing the restrain circle-->
		<path d="M{restrainCircleX1} {$height} A{restrainCircleRadius} {restrainCircleRadius} 0 0 1 {restrainCircleX2} {$height}Z"/>
	<!--drawing the three point line-->
		<path d="M{threePointLineX1} 0 {threePointLineX1} {threePointLineY2} A{threePointLineRadius} {threePointLineRadius} 0 0 0 {threePointLineX2} {threePointLineY2} L{threePointLineX2} 0Z"/>
	<!--drawing the restricted area-->
		<path d="M{restrictedAreaX1} {restrictedAreaY} A{restrictedAreaRadius} {restrictedAreaRadius} 0 0 0 {restrictedAreaX2} {restrictedAreaY}"/>
</g>