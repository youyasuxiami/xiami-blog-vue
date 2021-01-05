<template>
	<div style="width: 100%; height: 100%; display: flex; flex-direction: row;">
			<div style="height: 100%; width:20% ; display: flex; flex-direction: column;align-items: center;">
				<div style="height: 10%; padding: 10px;">
					<svg-icon icon-class="scrtime" style="color:#5cd9e8;width: 20px; height: 20px;"></svg-icon>
					<span>{{time}}</span>
					</div>
					<dv-decoration-8  style="height: 50%;" :color="['#3f7ff5', '#633cf1']" />
			</div>
	
		<dv-decoration-1 style="width:200px;height:50px;" />
		<div style="width:40%;">
			<h2 style="margin: 10px !important;">数据监控可视化</h2>
			<dv-decoration-6 style="width:60%;height:30%; margin:10px 0 0 90px;" :color="['#5e69ff', '#827fec']" />
		</div>
		<dv-decoration-1 style="width:200px;height:50px;" />
		<div style="height: 100%; width:20% ; display: flex; flex-direction: column;align-items: center;">
			<div style="height: 10%; padding: 10px;">
				<span >{{date}}</span>
				<span style="margin-left: 10px;">{{week}}</span></div>
				<dv-decoration-8 :reverse="true" style="height: 50%;" :color="['#3f7ff5', '#633cf1']" />
		</div>
			
		<!-- <dv-decoration-8 :reverse="true" style="width:20%;height:50%;" :color="['#3f7ff5', '#633cf1']" /> -->

	</div>
</template>

<script>
	import {
		getDate,
		getWeekDate,
		getTime
	} from '../screen/sub/datetime.js'
	export default{
		data(){
			return{
				time: "",
				date: "",
				week: "",
			}
		},
		mounted() {
			this.setNowTime();
		},
		methods: {
			setNowTime() {
				this.date = getTime();
				this.week=getWeekDate();
				setInterval(() => {
					this.time = getDate();
		
				}, 1000);
		
			},
			
			
		},
	}
</script>

<style scoped lang="scss">
	span{
		font-size: 19px;
		font-weight: 800;
		color: #5cd9e8;
	}
	h2 {
		transform: translate(35%);
	}
</style>
