<template>
	<div  class="flyline">
		<!-- <div class="title">
		 城市占比
		</div> -->
		<div class="content">
			<dv-flyline-chart-enhanced :dev="true" :config="config" style="width:100%;height:100%; " />
		</div>
	</div>

</template>
<script>
	import img from "@/assets/bg.png"
	export default{
		data(){
			return{
				config:{
					 points: [
					    {
					      name: '郑州',
					      coordinate: [0.48, 0.35],
					     halo: {
					        show: true,
					      },
					      icon: {
					       /* src: '/assets/mapPoint.png', */
					        width: 30,
					        height: 30
					      },
					      text: {
					        show: false
					      }
					    },
					    {
					      name: '新乡',
					      coordinate: [0.58, 0.2]
					    },
					    {
					      name: '焦作',
					      coordinate: [0.46, 0.25]
					    },
					    {
					      name: '开封',
					      coordinate: [0.59, 0.35]
					    },
					    {
					      name: '许昌',
					      coordinate: [0.53, 0.4]
					    },
					    {
					      name: '平顶山',
					      coordinate: [0.45, 0.44]
					    },
					    {
					      name: '洛阳',
					      coordinate: [0.36, 0.38]
					    },
					    {
					      name: '周口',
					      coordinate: [0.65, 0.45]
					    },
					    {
					      name: '漯河',
					      coordinate: [0.56, 0.48]
					    },
					    {
					      name: '南阳',
					      coordinate: [0.37, 0.66]
					    },
					    {
					      name: '信阳',
					      coordinate: [0.75, 0.71]
					    },
					    {
					      name: '驻马店',
					      coordinate: [0.60, 0.57]
					    },
					    {
					      name: '济源',
					      coordinate: [0.37, 0.21]
					    },
					    {
					      name: '三门峡',
					      coordinate: [0.20, 0.36]
					    },
					    {
					      name: '商丘',
					      coordinate: [0.78, 0.38]
					    },
					    {
					      name: '鹤壁',
					      coordinate: [0.61, 0.12]
					    },
					    {
					      name: '濮阳',
					      coordinate: [0.71, 0.09]
					    },
					    {
					      name: '安阳',
					      coordinate: [0.59, 0.05]
					    }
					  ],
					  lines: [
					    {
					      source: '新乡',
					      target: '郑州'
					    },
					    {
					      source: '焦作',
					      target: '郑州'
					    },
					    {
					      source: '开封',
					      target: '郑州'
					    },
					    {
					      source: '许昌',
					      target: '郑州'
					    },
					    {
					      source: '平顶山',
					      target: '郑州'
					    },
					    {
					      source: '洛阳',
					      target: '郑州'
					    },
					    {
					      source: '周口',
					      target: '郑州'
					    },
					    {
					      source: '漯河',
					      target: '郑州'
					    },
					    {
					      source: '南阳',
					      target: '郑州'
					    },
					    {
					      source: '信阳',
					      target: '郑州'
					    },
					    {
					      source: '驻马店',
					      target: '郑州'
					    },
					    {
					      source: '济源',
					      target: '郑州'
					    },
					    {
					      source: '三门峡',
					      target: '郑州'
					    },
					    {
					      source: '商丘',
					      target: '郑州'
					    },
					    {
					      source: '鹤壁',
					      target: '郑州'
					    },
					    {
					      source: '濮阳',
					      target: '郑州'
					    },
					    {
					      source: '安阳',
					      target: '郑州'
					    }
					  ],
					  icon: {
					    show: true,
					   /* src: '../assets/img/flylineChart/mapPoint.png' */
					  },
					  text: {
					    show: true,
					  },
					  k: 0.5,
					  /* bgImgSrc: img */
					}













			}
		},
		mounted() {

		},
		methods:{

		}
	}

</script>
<style lang="scss" scoped>
	.flyline{
		display: flex;
		flex-direction: column;
		height: 100%;
		text-align: center;
		/* .titil{
		height: 30%;
			padding-top: 20px;

		} */
		.content{
			flex: 2;
		}
	}
</style>
