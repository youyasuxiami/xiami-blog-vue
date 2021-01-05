<template>
	<div class="into">
		<div class="topTitle" >
			<span style="color:#5cd9e8">
				<svg-icon icon-class="stotop"></svg-icon>
			</span>
			<span class="fs-xl text mx-2">环境严重级别</span>
		</div>
		<div class="content">
			<dv-capsule-chart :config="config" style="height:80%" />
		</div>

	</div>
</template>

<script>
	const echarts = require("echarts");
	import api from '@/http/api'
	export default {
		data() {
			return {
				config: {
					data: [{
							name: '未分类',
							value:10
						},
						{
							name: '信息',
							value: 15
						},
						{
							name: '警告',
							value: 1
						},
						{
							name: '一般严重',
							value: 6
						},
						{
							name: '严重',
							value: 7
						},
						{
							name: '灾难',
							value: 9
						}
					],
					/* activeRadius: "70%",
					showOriginValue: true,
					radius: "60%", */
					  unit: '单位',
					/* colors: ['#d0d0d0', '#676fd3', '#f8ff61', '#ff9b29', '#d33e04', '#9a046d'] */
				}
			};
		},
		mounted() {
			/* this.fetchData() */
		},
		methods: {
			fetchData() {
				api.alert.unsolvedAlertInfo() //首页异常监控
					.then(response => {
						let alarm = "";
						if (response.code === 200) {
							alarm = response.data.severities;
							let config = [];
							config = this.config.data;
							config[0].value = alarm.notclassified;
							config[1].value = alarm.information;
							config[2].value = alarm.warning;
							config[3].value = alarm.average;
							config[4].value = alarm.high;
							config[5].value = alarm.disaster;
							/**
							 * 使用ES6拓展运算符生成新的props对象
							 * 组件侦知数据变化 自动刷新状态
							 */
							this.config = { ...this.config}
							setTimeout(this.fetchData,60000);

						}


					})
			}
		},
		destroyed() {
			window.onresize = null;
		}
	};
</script>

<style lang="scss" scoped>
	.into{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
.topTitle{
	height: 10%;
	padding-top: 15px;
}
.content{
	flex: 2;
  margin-top: 3%;
}
	}
</style>
