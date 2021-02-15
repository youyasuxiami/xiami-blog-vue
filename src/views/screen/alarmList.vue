<template>
	<div id="centreRight1">
		<div class="bg-color-black">

			<span style="color:#5cd9e8">
				<svg-icon icon-class="alalist"></svg-icon>
			</span>
			<span class="fs-xl text mx-2">最近告警信息</span>


		</div>
		<div class="d-flex">
			<dv-scroll-board :config="config" style="box-sizing:border-box;height:100%; " />
		</div>
	</div>
</template>

<script>
	import { getOperLogList } from '@/api/home'
	export default {
		data() {
			return {
				itemList: [],
				config: {

				}
			};
		},
		created() {
			this.initData()
		},
		mounted() {
			/* 	this.fetchData();
			 */

		},
		methods: {
			initData() {
				getOperLogList().then(response => {//这是json字符串请求
					let data1=response.data;

					this.config={
						header: ["操作人员",  "操作日志", "主机地址","操作地点", '操作状态', '操作时间'],
								data: data1,
							rowNum: 5, //表格行数

							headerBGC: "#0f1325", //表头
							oddRowBGC: "#0f1325", //奇数行
							evenRowBGC: "#171c33", //偶数行
							align: ["center"],
							columnWidth: [50, 150, 150, 200, 120, 100, 300],
							index: true
					}


				})
			}

			/* fetchData() {
				this.config.data = [];
				api.alert.unsolvedAlertList()
					.then(response => {
						if (response.code === 200) {
							this.itemList = response.data;
							let list = [],
								items = [];
							let data;
							this.itemList.forEach(item => {
								items.push(data = {
									clock: formatDate(item.clock, "yyyy-MM-dd hh:mm:ss"),
									hostName: item.hostName,
									ip: item.ip,
									severity: fommater(item.severity),
									name: item.name,
									lasttime: formatSeconds(item.lasttime),


								})

							});
							if (items.length > 0) {
								items.forEach(ite => {
									list.push(Object.values(ite));
								});
								this.config.data = list;
							}

							this.config = { ...this.config
							}

							setTimeout(this.fetchData, 60000);
						}


					})

			}, */


		}
	};
</script>

<style lang="scss">
	#centreRight1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;

		.bg-color-black {
			height: 10%;
			padding-top: 25px;
		}

		.d-flex {
			width: 95%;
			flex: 2;
			padding: 0 20px 0 20px;

		}

		.dv-scroll-board .header {
			height: 30px;
		}


	}
</style>
