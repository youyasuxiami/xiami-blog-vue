<template>
  <div class="cputop">
	  <div class="topTitle" >
	  	<span style="color:#5cd9e8">
	  		<svg-icon icon-class="alarun"></svg-icon>
	  	</span>
	  	<span class="fs-xl text mx-2">热门类别</span>

	  </div>
    <div id="LeftChart" style="height:100%"  ></div>
  </div>
</template>

<script>
import { getHotBlogTypeAndNum } from '@/api/home'
export default {
  data() {
    return {
	  item:"",
    };
  },
	created() {
		this.initData()
	},
  methods: {
	  initData() {
		  getHotBlogTypeAndNum().then(response => {//这是json字符串请求
			  let data1=response.data;
			  let category=[];
			  let data=[]

			  for (let i = 0; i < data1.length; i++) {
				  category.push(data1[i].name)
				  data.push(data1[i].value)
			  }
			  this.draw(category,data);
		  })
	  },
    draw(category,data) {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("LeftChart"));
      //  ----------------------------------------------------------------
      let option = {
        title: {
          text: "",
          x: "center",
          y: 0,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 16,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC"
            }
          }
        },
        legend: {
          textStyle: {
            color: "#B4B4B4"
          },
          top: "0%"
        },
        grid: {
          x: "11%",
          width: "80%",
          y: "4%"
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [

          {
			 type: 'value',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            type: "line",
			areaStyle: {},
			 smooth: true,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
				  { offset: 0, color: "#f06371" },
				  { offset: 0.2, color: "#7979e5" },
				  { offset: 1, color: "rgba(156,107,211,0.2)" }//rgba(156,107,211,0.2)
                ])
              }
            },
            data: data
          },
        ]
      };
	   this.chart.setOption(option);
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style lang="scss" scoped>
	.cputop{
		display: flex;
		flex-direction: column;
		height: 100%;
		text-align: center;
		.topTitle{
			height: 10%;
			padding: 10px;
		}
		#LeftChart{
			flex: 2;
		}
	}
</style>
