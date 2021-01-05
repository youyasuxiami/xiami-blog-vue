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
	import api from '@/http/api'
	import {
		deepCopy,
		formatDate,
		formatSeconds
	} from "@/utils/index";
	export default {
		data() {
			return {
				itemList: [],
				config: {
					header: ["出现时间", "城市名称", "城市级别", "严重性", '问题', '持续时间'],
					data: [
						['行1列1', '行1列2', '行1列3'],
						['行2列1', '行2列2', '行2列3'],
						['行3列1', '行3列2', '行3列3'],
						['行4列1', '行4列2', '行4列3'],
						['行5列1', '行5列2', '行5列3'],
						['行6列1', '行6列2', '行6列3'],
						['行7列1', '行7列2', '行7列3'],
						['行8列1', '行8列2', '行8列3'],
						['行9列1', '行9列2', '行9列3'],
						['行10列1', '行10列2', '行10列3']
					],
					rowNum: 5, //表格行数

					headerBGC: "#0f1325", //表头
					oddRowBGC: "#0f1325", //奇数行
					evenRowBGC: "#171c33", //偶数行
					align: ["center"],
					columnWidth: [50, 200, 200, 200, 120, 100, 200],
					index: true
				}
			};
		},
		components: {},
		mounted() {
			/* 	this.fetchData();
			 */

		},
		methods: {
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
