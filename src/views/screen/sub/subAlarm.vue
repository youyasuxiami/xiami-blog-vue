<template>
  <div>
    <div :id="id" style="width:100%;height:85px;margin:auto"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
let chart= null

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.draw();
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "chartRate"
    },
    tips: {
      type: Number,
      required: true,
      default: 50
    },
    colorObj: {
      type: Object,
      default: function() {
        return {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5"
            }
          }
        };
      }
    }
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById(this.id));
      //  ----------------------------------------------------------------
      let tips = this.tips;
      let option = {
        title: [
          {
            text: tips,
            x: "center",
            y: "center",
            textStyle: {
              color: this.colorObj.textStyle,
              fontSize: 16
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ["70%", "90%"],
           /* center: ["50%", "50%"], */
            hoverAnimation: false,
            color: this.colorObj.series.color,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: tips,
                itemStyle: {
                  normal: {
                    color: this.colorObj.series.dataColor.normal,
                    shadowBlur: 10,
                    shadowColor: this.colorObj.series.dataColor.shadowColor
                  }
                }
              },
              {
                value: 100 - tips
              }
            ]
          }
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
</style>
