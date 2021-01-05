<template>
	<div class="alarm">
		<div class="topTitle">
			<span style="color:#5cd9e8">
				<i class="el-icon-s-data"></i>
			</span>
			<span>城市排名统计</span>

		</div>
		<div class="content">
			<dv-scroll-ranking-board :config="config" style="height:85%; width: 80%;margin-left: 20px;" />
		</div>
	</div>



</template>

<script>
	import api from "@/http/api";
	export default {
		data() {
			return {
				config: {
					data: [{
							name: '周口',
							value: 55
						},
						{
							name: '南阳',
							value: 120
						},
						{
							name: '西峡',
							value: 78
						},
						{
							name: '驻马店',
							value: 66
						},
						{
							name: '新乡',
							value: 80
						},
						{
							name: '信阳',
							value: 45
						},
						{
							name: '漯河',
							value: 29
						}
					]
				}
			}
		},
		methods: {

			fetchData() {
				this.config.data = [];
				api.summary.problemHosts().then((response) => {
					if (response.code === 200) {
						let invNum = response.data;
						invNum.forEach(item => {
							this.config.data.push({
								name: item.name,
								value: item.warnNum,

							})
						})
						/**
						 * 使用ES6拓展运算符生成新的props对象
						 * 组件侦知数据变化 自动刷新状态
						 */
						this.config = { ...this.config
						}
						setTimeout(this.fetchData, 60000);

					}
				})
			},
		},

		mounted() {
			/* this.fetchData(); */
		}

	}
</script>

<style>
	.alarm {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.topTitle {
		height: 10%;
			padding-top: 20px;

		}

		.content {
			flex: 2;

		}

	}
</style>
