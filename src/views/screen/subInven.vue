<template>
	<div id="center">
		<div class="ctitle">
			<svg-icon icon-class="invstu" style="color:#5cd9e8;position: absolute; left: 25%;top: 8%;"></svg-icon>
			<span class="fs-xl text mx-2">城市垃圾分类实施情况</span>

		</div>
		<div class="percent">
			<div class="item">
				<centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
				<span>
					<div style="border-radius:4px; background-color: #3fc0fb;width: 8px; height: 8px;line-height: 8px;margin-top: 5px;"></div>已实施
				</span>
			</div>
			<div class="item">
				<centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
				<span>
					<div style="border-radius:4px; background-color: #ff9800;width: 8px; height: 8px; line-height: 8px; margin-top: 5px;"></div>未实施
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import centerChart from "./sub/invenStatus.vue"
	export default {
		components: {
			centerChart
		},
		/* props: ["hosts"],
		watch: {
			hosts: {
				handler(newValue, oldValue) {
					this.hosts.total=newValue.total;
					this.hosts.enabled=newValue.enabled;

				},
				deep: true
			}
		}, */

		data() {
			return {
				// 资产情况（在线/启动）的组件复用数据
				rate: [{
						id: "centerRate1",
						tips: 15,
						colorData: {
							textStyle: "#3fc0fb",
							series: {
								color: ["#00bcd44a", "transparent"],
								dataColor: {
									normal: "#03a9f4",
									shadowColor: "#97e2f5"
								}
							}
						}
					},
					{
						id: "centerRate2",
						tips: 20,
						colorData: {
							textStyle: "#67e0e3",
							series: {
								color: ["#faf3a378", "transparent"],
								dataColor: {
									normal: "#ff9800",
									shadowColor: "#fcebad"
								}
							}
						}
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	#center {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;

		.ctitle {
			padding: 10px;
			color: whitesmoke;
			height: 10%;

		}

		.percent {
			display: flex;
			flex-direction: row;
			 width: 100%;
			 flex: 1;
      margin-top: 3%;
			.item{
				width: 50%;
			}
			span{
				display: flex;
				justify-content: center;


			};


		}
	}
</style>
