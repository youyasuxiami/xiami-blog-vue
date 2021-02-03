<template>
	<div class="into">
		<div class="topTitle" >
			<span style="color:#5cd9e8">
				<svg-icon icon-class="stotop"></svg-icon>
			</span>
			<span class="fs-xl text mx-2">文章标签</span>
		</div>
		<div class="content">
			<dv-capsule-chart :config="config" style="height:80%" />
		</div>

	</div>
</template>

<script>
	import { getBlogTagAndNum } from '@/api/home'
	export default {
		data() {
			return {
				config: {

				}
			};
		},
		created() {
			this.initData()
		},
		methods: {
			initData() {
				getBlogTagAndNum().then(response => {//这是json字符串请求
					let data1=response.data;
					this.config={
						data: data1,
						unit: '单位'
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
