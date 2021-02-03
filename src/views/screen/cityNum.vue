<template>
	<div style="height:100%">
		<div class="title" style="padding-top: 20px; text-align: center;">
			<svg-icon icon-class="invstu" style="color:#5cd9e8"></svg-icon>
			<span class="fs-xl text mx-2">黑名单用户数量</span>
			<span style="position:absolute;right:20px;top:20px;">
				总: 100</span>
		</div>

		<div id="alarm" style="height:calc(80% - 10px);"></div>
	</div>
</template>

<script>
  import centerChart from "./sub/subAlarm.vue";
	export default {
		components: {
			centerChart,
		},
		/*  props: ["trigger"],
		  watch: {
		    trigger: {
		      immediate: true,
		      handler(newValue, oldValue) {
		        this.cards = [];
		        this.cards.push({ name: "启用", value: newValue.enabled });
		        this.cards.push({ name: "禁用", value: newValue.disabled });
		        this.cards.push({ name: "正常", value: newValue.ok });
		        this.cards.push({ name: "异常", value: newValue.problem });
		        this.$nextTick(() => {
		          this.initData();
		        });
		      },
		      deep: true,
		    },
		  }, */
		data() {
			return {
				cards: [],
				option: {
					grid: {
						show: false,
						top: 10,
						bottom: 10,
					},
					xAxis: [{
						gridIndex: 0,
						type: "value",
						show: false, //是否显示坐标轴
						min: 0,//坐标轴刻度最小值
						max: 100,//坐标轴刻度最大值
						nameLocation: "middle", //坐标轴名称显示的位置
						nameGap: 5, //坐标轴名称与轴线之间的距离。
					}, ],
					yAxis: [{
						gridIndex: 0,
						min: 0,
						show: false,
						max: 100,
						nameLocation: "middle",
						nameGap: 30,
					}, ],
					series: [{
						type: "effectScatter",
						hoverAnimation: true,
						label: {
							normal: {
								show: true,
								formatter: "{b}",
								color: "#fff",
								textStyle: {
									fontSize: "20",
								},
							},
						},
						itemStyle: {
							normal: {
								color: "#00acea",
							},
						},
						data: [],
					}, ],
				},
				datalist: [{
						offset: [5, 50],
						symbolSize: 60,
						opacity: 0.95,
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#29c0fb",
							},
							{
								offset: 1,
								color: "#2dc5b9",
							},
						]),
					},
					{
						offset: [35, 50],
						symbolSize: 60,
						opacity: 0.95,
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#35d17e",
							},
							{
								offset: 1,
								color: "#49ddb2",
							},
						]),
					},
					{
						offset: [65, 50],
						symbolSize: 60,
						opacity: 0.95,
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#e5d273",
							},
							{
								offset: 1,
								color: "#e4a37f",
							},
						]),
					},
					{
						offset: [95, 50],
						symbolSize: 60,
						opacity: 0.95,
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#277aec",
							},
							{
								offset: 1,
								color: "#57c5ec",
							},
						]),
					},
				],
			};
		},
		mounted() {
			this.myChart = this.$echarts.init(document.getElementById('alarm'));

			this.cards = [];
			this.cards.push({
				name: "启用",
				value: 10
			});
			this.cards.push({
				name: "禁用",
				value: 15
			});
			this.cards.push({
				name: "正常",
				value: 6
			});
			this.cards.push({
				name: "异常",
				value: 9
			});
			this.$nextTick(() => {
				this.initData();
			});
		},
		methods: {
			initData() {
				var datas = [];
				for (var i = 0; i < this.cards.length; i++) {
					var item = this.cards[i];
					var itemToStyle = this.datalist[i];
					datas.push({
						name: item.name + "\n" + item.value,
						value: itemToStyle.offset,
						symbolSize: itemToStyle.symbolSize,
						label: {
							normal: {
								textStyle: {
									fontSize: 18,
									fontWeight: 800,
									lineHeight: 22,
								},
							},
						},
						itemStyle: {
							normal: {
								color: itemToStyle.color,
								opacity: itemToStyle.opacity,
							},
						},
					});
				}
				this.option.series[0].data = datas;
				this.myChart.setOption(this.option);
			},
		},
	};
</script>

<style lang="scss" scoped>

</style>
