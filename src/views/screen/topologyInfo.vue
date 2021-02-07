<template>
    <!--  <div  class="flyline">-->
    <!--    &lt;!&ndash; <div class="title">-->
    <!--     城市占比-->
    <!--    </div> &ndash;&gt;-->
    <!--    <div class="content">-->
    <!--      <dv-flyline-chart-enhanced :dev="true" :config="config" style="width:100%;height:100%; " />-->
    <!--    </div>-->
    <!--  </div>-->
    <div class="echarts">
        <div :style="{height:'400px',width:'100%'}" ref="myEchart"></div>
    </div>
</template>
<script>
  import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  import { getProvinceAndNum } from '@/api/home'
  export default{
    data(){
      return{
          chart: null,
         allData : {"citys":[{"name":"台北","value":[121.579138,25.035286,-19],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"石家庄","value":[114.51463,38.048767,-364],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"太原","value":[112.559271,37.876079,-2],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"呼和浩特","value":[111.759536,40.849295,-2],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"沈阳","value":[123.46822,41.681244,-14],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"长春","value":[125.321982,43.82237,2],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"哈尔滨","value":[126.54506,45.805204,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"南京","value":[118.796673,32.065142,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"杭州","value":[118.796673,32.065142,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"合肥","value":[117.236316,31.827069,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"福州","value":[119.302895,26.07991,-5],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"南昌","value":[115.870334,28.688948,2],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"济南","value":[117.121225,36.659333,3],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"郑州","value":[117.121225,36.659333,4],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"武汉","value":[114.304687,30.59797,-1],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"长沙","value":[112.94662,28.232853,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"广州","value":[113.269129,23.135336,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"南宁","value":[108.368855,22.823673,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"海口","value":[110.206141,20.0532,32],"symbolSize":3,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"成都","value":[104.080794,30.579491,3],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"贵阳","value":[106.642329,26.652291,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"昆明","value":[102.848067,24.886796,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"拉萨","value":[91.174434,29.659487,52],"symbolSize":3,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"西安","value":[108.940716,34.35013,17],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"兰州","value":[103.837074,36.063967,41],"symbolSize":3,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"西宁","value":[101.778122,36.617823,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"银川","value":[106.233897,38.493366,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"乌鲁木齐","value":[87.617539,43.828682,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"北京","value":[116.439833,39.909153,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"天津","value":[116.439833,39.909153,17],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"上海","value":[121.48399,31.234941,-2],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"重庆","value":[121.48399,31.234941,1],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"name":"香港","value":[114.170594,22.279184,-2],"symbolSize":2,"itemStyle":{"normal":{"color":"#58B3CC"}}},{"name":"南海诸岛","value":[115.004125,12.601102,2],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},{"moveLines":[{"fromName":"台北","toName":"广州","coords":[[121.579138,25.035286],[113.269129,23.135336]]},{"fromName":"石家庄","toName":"广州","coords":[[114.51463,38.048767],[113.269129,23.135336]]},{"fromName":"太原","toName":"广州","coords":[[112.559271,37.876079],[113.269129,23.135336]]},{"fromName":"呼和浩特","toName":"广州","coords":[[111.759536,40.849295],[113.269129,23.135336]]},{"fromName":"沈阳","toName":"广州","coords":[[123.46822,41.681244],[113.269129,23.135336]]},{"fromName":"长春","toName":"广州","coords":[[125.321982,43.82237],[113.269129,23.135336]]},{"fromName":"哈尔滨","toName":"广州","coords":[[126.54506,45.805204],[113.269129,23.135336]]},{"fromName":"南京","toName":"广州","coords":[[118.796673,32.065142],[113.269129,23.135336]]},{"fromName":"杭州","toName":"广州","coords":[[118.796673,32.065142],[113.269129,23.135336]]},{"fromName":"合肥","toName":"广州","coords":[[117.236316,31.827069],[113.269129,23.135336]]},{"fromName":"福州","toName":"广州","coords":[[119.302895,26.07991],[113.269129,23.135336]]},{"fromName":"南昌","toName":"广州","coords":[[115.870334,28.688948],[113.269129,23.135336]]},{"fromName":"济南","toName":"广州","coords":[[117.121225,36.659333],[113.269129,23.135336]]},{"fromName":"郑州","toName":"广州","coords":[[117.121225,36.659333],[113.269129,23.135336]]},{"fromName":"武汉","toName":"广州","coords":[[114.304687,30.59797],[113.269129,23.135336]]},{"fromName":"长沙","toName":"广州","coords":[[112.94662,28.232853],[113.269129,23.135336]]},{"fromName":"南宁","toName":"广州","coords":[[108.368855,22.823673],[113.269129,23.135336]]},{"fromName":"海口","toName":"广州","coords":[[110.206141,20.0532],[113.269129,23.135336]]},{"fromName":"成都","toName":"广州","coords":[[104.080794,30.579491],[113.269129,23.135336]]},{"fromName":"贵阳","toName":"广州","coords":[[106.642329,26.652291],[113.269129,23.135336]]},{"fromName":"昆明","toName":"广州","coords":[[102.848067,24.886796],[113.269129,23.135336]]},{"fromName":"拉萨","toName":"广州","coords":[[91.174434,29.659487],[113.269129,23.135336]]},{"fromName":"西安","toName":"广州","coords":[[108.940716,34.35013],[113.269129,23.135336]]},{"fromName":"兰州","toName":"广州","coords":[[103.837074,36.063967],[113.269129,23.135336]]},{"fromName":"西宁","toName":"广州","coords":[[101.778122,36.617823],[113.269129,23.135336]]},{"fromName":"银川","toName":"广州","coords":[[106.233897,38.493366],[113.269129,23.135336]]},{"fromName":"乌鲁木齐","toName":"广州","coords":[[87.617539,43.828682],[113.269129,23.135336]]},{"fromName":"北京","toName":"广州","coords":[[116.439833,39.909153],[113.269129,23.135336]]},{"fromName":"天津","toName":"广州","coords":[[116.439833,39.909153],[113.269129,23.135336]]},{"fromName":"上海","toName":"广州","coords":[[121.48399,31.234941],[113.269129,23.135336]]},{"fromName":"重庆","toName":"广州","coords":[[121.48399,31.234941],[113.269129,23.135336]]},{"fromName":"香港","toName":"广州","coords":[[114.170594,22.279184],[113.269129,23.135336]]},{"fromName":"南海诸岛","toName":"广州","coords":[[115.004125,12.601102],[113.269129,23.135336]]}]}],"moveLines":[{"fromName":"台北","toName":"广州","coords":[[121.579138,25.035286],[113.269129,23.135336]]},{"fromName":"石家庄","toName":"广州","coords":[[114.51463,38.048767],[113.269129,23.135336]]},{"fromName":"太原","toName":"广州","coords":[[112.559271,37.876079],[113.269129,23.135336]]},{"fromName":"呼和浩特","toName":"广州","coords":[[111.759536,40.849295],[113.269129,23.135336]]},{"fromName":"沈阳","toName":"广州","coords":[[123.46822,41.681244],[113.269129,23.135336]]},{"fromName":"长春","toName":"广州","coords":[[125.321982,43.82237],[113.269129,23.135336]]},{"fromName":"哈尔滨","toName":"广州","coords":[[126.54506,45.805204],[113.269129,23.135336]]},{"fromName":"南京","toName":"广州","coords":[[118.796673,32.065142],[113.269129,23.135336]]},{"fromName":"杭州","toName":"广州","coords":[[118.796673,32.065142],[113.269129,23.135336]]},{"fromName":"合肥","toName":"广州","coords":[[117.236316,31.827069],[113.269129,23.135336]]},{"fromName":"福州","toName":"广州","coords":[[119.302895,26.07991],[113.269129,23.135336]]},{"fromName":"南昌","toName":"广州","coords":[[115.870334,28.688948],[113.269129,23.135336]]},{"fromName":"济南","toName":"广州","coords":[[117.121225,36.659333],[113.269129,23.135336]]},{"fromName":"郑州","toName":"广州","coords":[[117.121225,36.659333],[113.269129,23.135336]]},{"fromName":"武汉","toName":"广州","coords":[[114.304687,30.59797],[113.269129,23.135336]]},{"fromName":"长沙","toName":"广州","coords":[[112.94662,28.232853],[113.269129,23.135336]]},{"fromName":"南宁","toName":"广州","coords":[[108.368855,22.823673],[113.269129,23.135336]]},{"fromName":"海口","toName":"广州","coords":[[110.206141,20.0532],[113.269129,23.135336]]},{"fromName":"成都","toName":"广州","coords":[[104.080794,30.579491],[113.269129,23.135336]]},{"fromName":"贵阳","toName":"广州","coords":[[106.642329,26.652291],[113.269129,23.135336]]},{"fromName":"昆明","toName":"广州","coords":[[102.848067,24.886796],[113.269129,23.135336]]},{"fromName":"拉萨","toName":"广州","coords":[[91.174434,29.659487],[113.269129,23.135336]]},{"fromName":"西安","toName":"广州","coords":[[108.940716,34.35013],[113.269129,23.135336]]},{"fromName":"兰州","toName":"广州","coords":[[103.837074,36.063967],[113.269129,23.135336]]},{"fromName":"西宁","toName":"广州","coords":[[101.778122,36.617823],[113.269129,23.135336]]},{"fromName":"银川","toName":"广州","coords":[[106.233897,38.493366],[113.269129,23.135336]]},{"fromName":"乌鲁木齐","toName":"广州","coords":[[87.617539,43.828682],[113.269129,23.135336]]},{"fromName":"北京","toName":"广州","coords":[[116.439833,39.909153],[113.269129,23.135336]]},{"fromName":"天津","toName":"广州","coords":[[116.439833,39.909153],[113.269129,23.135336]]},{"fromName":"上海","toName":"广州","coords":[[121.48399,31.234941],[113.269129,23.135336]]},{"fromName":"重庆","toName":"广州","coords":[[121.48399,31.234941],[113.269129,23.135336]]},{"fromName":"香港","toName":"广州","coords":[[114.170594,22.279184],[113.269129,23.135336]]}]}
        ,toolTipData: []
      }
    },
    created() {
      this.initData()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      // 初始化数据
      initData() {
        getProvinceAndNum().then(response => {//这是json字符串请求
          this.toolTipData = response.data
          this.chinaConfigure()
        })
      },

      chinaConfigure() {
        let that = this
        let mapdemo='china'
        let myChart = this.$echarts.init(this.$refs.myEchart) //这里是为了获得容器所在位置
        window.onresize = myChart.resize
        myChart.setOption({
          // title: {
          //   text: '',
          //   left: 'center',
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
          // legend: {
          //   show: false,
          //   orient: 'vertical',
          //   top: 'bottom',
          //   left: 'right',
          //   data: ['地点', '线路'],
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              for (let i = 0; i < that.toolTipData.length; i++) {
                if (params.name == that.toolTipData[i].name) {
                  return '<i style="display: inline-block;width: 10px;height: 10px;' +
                          'background: #00a854;margin-right: 5px;border-radius: 50%;}"></i>'
                          + that.toolTipData[i].name
                          + '<br/>'
                          + '访问量：'
                          +that.toolTipData[i].value
                }
              }
            }
          },
          // visualMap: {
          //   min: 800,
          //   max: 50000,
          //   text: ['高', '低'],
          //   realtime: false,
          //   calculable: true,
          //   inRange: {
          //     color: ['lightskyblue', 'yellow', 'orangered']
          //   }
          // },
          // visualMap: {
          //   show: true,
          //   min: 0,
          //   max: 200,
          //   left: 'left',
          //   top: 'bottom',
          //   text: ['高', '低'], // 文本，默认为数值文本
          //   calculable: true,
          //   seriesIndex: [1],
          //   inRange: {
          //
          //     color: ['#00467F', '#A5CC82'] // 蓝绿
          //   }
          // },
          geo: {
            map: mapdemo,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              // 鼠标经过地图显示地区名称
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
          // position: 'right',
          // formatter: function(params) {
          //   for (let i = 0; i < that.toolTipData.length; i++) {
          //     if (params.name == that.toolTipData[i].name) {
          //       return '<i style="display: inline-block;width: 10px;height: 10px;background: #00a854;margin-right: 5px;border-radius: 50%;}">'+that.toolTipData[i].name+'</i>'
          //     }
          //   }
          // }
          }
            },
            roam: true,//是否可拖动
            itemStyle: {
              normal: {//正常是颜色
                areaColor: 'rgba(7,21,57,0.5)',
                borderColor: '#0177ff'
              },
              emphasis: {// 鼠标悬浮高亮
                areaColor: '#071537'//鼠标指上市时的颜色
              }
            },
          },
          series: [
            {
              type: 'map',
              map: mapdemo,
              roam: true,//是否可拖动
              geoIndex: 0, // (bug fixed:解决在地图上缩放重影问题
              itemStyle: {
                normal: {//正常是颜色
                  areaColor: 'rgba(7,21,57,0.5)',
                  borderColor: '#0177ff'
                },
                emphasis: {// 鼠标悬浮高亮
                  areaColor: '#071537'//鼠标指上市时的颜色
                }
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data: that.toolTipData
            },

                    {
              name: '地点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              //原点的文字
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  formatter: '{b}',
                  textStyle: {
                    color: '#fff'
                  },
                },
                emphasis: {
                  show: true,
                  position: 'right',
                  formatter: '{b}',
                  textStyle: {
                    color: '#fff'
                  },
                }
              },
              symbolSize: 3,
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: '#46bee9'
                }
              },
              data: this.allData.citys
            }, {
              name: '线路',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 1,
              large: true,
              effect: {
                show: true,
                constantSpeed: 30,
                symbol: 'pin',
                symbolSize: 2,//移动体大小
                trailLength: 0,
              },
              lineStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#58B3CC'
                  }, {
                    offset: 1, color: '#F58158'
                  }], false),
                  width: 1,//宽度
                  opacity: 0.2,//透明度
                  curveness: 0.2//弯曲度
                }
              },
              data: this.allData.moveLines
            }
          ]
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
    /*.flyline{*/
    /*  display: flex;*/
    /*  flex-direction: column;*/
    /*  height: 100%;*/
    /*  text-align: center;*/
    /*  !* .titil{*/
    /*  height: 30%;*/
    /*    padding-top: 20px;*/

    /*  } *!*/
    /*  .content{*/
    /*    flex: 2;*/
    /*  }*/
    /*}*/
</style>
