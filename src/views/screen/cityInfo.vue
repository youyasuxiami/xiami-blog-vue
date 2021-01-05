<template>
	<div class="bottom-left-chart-1">
		<div class="header-name">
			<svg-icon icon-class="alanum" style="color:#5cd9e8"></svg-icon>
			城市设备完好率
			</div>
		<div class="content">
			<dv-charts :option="option" style="height: 100%;" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BottomLeftChart1',
		data() {
			return {
				option: {
					series: [{
							type: 'pie',
							data: [{
									name: '监控系统',
									value: 93,
									radius: ['30%', '37%']
								},
								{
									name: '收费系统',
									value: 65,
									radius: ['32%', '36%']
								},
								{
									name: '通信系统',
									value: 32,
									radius: ['31%', '38%']
								},
								{
									name: '供配电系统',
									value: 44,
									radius: ['31%', '36%']
								},
								{
									name: '其它',
									value: 52,
									radius: ['32%', '35%']
								}
							],
							outsideLabel: {
								labelLineEndLength: 20,
								formatter: '{percent}%\n{name}',
								style: {
									fill: '#ffffff'
								}
							}
						},
						{
							name: 'decoration ring',
							type: 'pie',
							data: [{
								value: 10,
								radius: ['60%', '63%']
							}],
							outsideLabel: {
								show: false
							},
							pieStyle: {
								fill: 'rgba(255, 255, 255, 0.2)'
							}
						},
						{
							name: 'decoration ring',
							type: 'pie',
							data: [{
								value: 10,
								radius: ['50%', '53%']
							}],
							outsideLabel: {
								show: false
							},
							pieStyle: {
								fill: 'rgba(255, 255, 255, 0.2)'
							}
						},
						
						{
							name: 'decoration ring',
							type: 'pie',
							data: [{
								value: 10,
								radius: ['48%', '46%']
							}],
							outsideLabel: {
								show: false
							},
							pieStyle: {
								fill: '#6666f8'
							}
							/* pieStyle: {
								fill: 'rgba(255, 255, 255, 0.2)'
							} */
						}
					],
					 color: ['#00c0ff', '#3de7c9', '#7c74ec', '#f1f34b', '#72d0ac',] 
				}
			}
		}
	}
</script>

<style lang="scss">
	.bottom-left-chart-1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;

		.header-name {
			height: 10%;
			padding-top: 10px;
			text-align: center;
		}

		.content {
			flex: 2;
		}


		/* .decoration-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid fade(#fefefe, 30);
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  } */
	}
</style>
