<template>
    <div class="bottom-left-chart-1">
        <div class="header-name">
            <svg-icon icon-class="alanum" style="color:#5cd9e8"></svg-icon>
            文章类别
        </div>
        <div class="content">
            <dv-charts :option="option" style="height: 100%;"/>
        </div>
    </div>
</template>

<script>
  import { getBlogTypeAndNum } from '@/api/home'

  export default {
    name: 'BottomLeftChart1',
    data() {
      return {
        option: {},
        data1: []
        // data1: [{
        //   name: '监控系统',
        //   value: 93,
        // },
        //   {
        //     name: '收费系统',
        //     value: 65,
        //   },
        //   {
        //     name: '通信系统',
        //     value: 32,
        //   },
        //   {
        //     name: '供配电系统',
        //     value: 44,
        //   },
        //   {
        //     name: '其它',
        //     value: 52,
        //   }
        // ]
      }
    },
    created() {
      this.initBlogType()
    },
    methods: {
      initBlogType() {
        getBlogTypeAndNum().then(response => {//这是json字符串请求
          this.data1 = response.data
          this.option = {
            series: [{
              type: 'pie',
              radius: ['30%', '37%'],
              data: this.data1,
              outsideLabel: {
                labelLineEndLength: 20,
                formatter: '{percent}%\n{name}',
                style: {
                  fill: '#ffffff'
                }
              }
            },
              {
                name: 'decoration ring',
                type: 'pie',
                data: [{
                  value: 10,
                  radius: ['60%', '63%']
                }],
                outsideLabel: {
                  show: false
                },
                pieStyle: {
                  fill: 'rgba(255, 255, 255, 0.2)'
                }
              },
              {
                name: 'decoration ring',
                type: 'pie',
                data: [{
                  value: 10,
                  radius: ['50%', '53%']
                }],
                outsideLabel: {
                  show: false
                },
                pieStyle: {
                  fill: 'rgba(255, 255, 255, 0.2)'
                }
              },
              {
                name: 'decoration ring',
                type: 'pie',
                data: [{
                  value: 10,
                  radius: ['48%', '46%']
                }],
                outsideLabel: {
                  show: false
                },
                pieStyle: {
                  fill: '#6666f8'
                }
              }
            ]
            // color: ['#00c0ff', '#3de7c9', '#7c74ec', '#f1f34b', '#72d0ac',]
          }
        })
      }
    }
  }
</script>

<style lang="scss">
    .bottom-left-chart-1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;

        .header-name {
            height: 10%;
            padding-top: 10px;
            text-align: center;
        }

        .content {
            flex: 2;
        }


        /* .decoration-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid fade(#fefefe, 30);
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  } */
    }
</style>
