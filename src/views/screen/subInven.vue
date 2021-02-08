<template>
    <div id="center">
        <div class="percent">
            <div class="item">
            <span>
              <div style="border-radius:4px; background-color: #3fc0fb;width: 8px; height: 8px;line-height: 8px;margin-top: 5px;"></div>
              <div style="font-size: 14px">本月新增用户</div>
            </span>
                <div class="textShow ">
                    <span class="textColor1" >{{this.data1.addNum}}</span>
                    <span style="font-size: 12px">&nbsp;个</span>
                </div>
            </div>

            <div class="item">
              <span>
                <div style="border-radius:4px; background-color: #ff9800;width: 8px; height: 8px; line-height: 8px;margin-top: 5px;"></div>
                <div style="font-size: 14px">今日在线用户</div>
				</span>
                <div class="textShow ">
                    <span class="textColor2">{{this.data1.onlineNum}}</span>
                    <span style="font-size: 12px">&nbsp;个</span>
                </div>
            </div>

            <div class="item">
            <span>
                <div style="border-radius:4px; background-color: #277aec;width: 8px; height: 8px;line-height: 8px;margin-top: 5px;"></div>
              <div style="font-size: 14px">网站访问量
              </div>
            </span>
                <div class="textShow "><span class="textColor3">{{this.data1.views}}</span>
                    <span style="font-size: 12px">&nbsp;次</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import centerChart from './sub/invenStatus.vue'
  import { getAddNumAndOnlineNum } from '@/api/home'

  export default {
    components: {
      centerChart
    },
    /* props: ["hosts"],
    watch: {
      hosts: {
        handler(newValue, oldValue) {
          this.hosts.total=newValue.total;
          this.hosts.enabled=newValue.enabled;

        },
        deep: true
      }
    }, */

    data() {
      return {
        data1: {},
        // 资产情况（在线/启动）的组件复用数据
        rate: []
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        getAddNumAndOnlineNum().then(response => {//这是json字符串请求
          this.data1 = response.data
          // this.rate = [{
          //   id: 'centerRate1',
          //   tips: this.data1.addNum,
          //   colorData: {
          //     textStyle: '#3fc0fb',
          //     series: {
          //       color: ['#00bcd44a', 'transparent'],
          //       dataColor: {
          //         normal: '#03a9f4',
          //         shadowColor: '#97e2f5'
          //       }
          //     }
          //   }
          // },
          //   {
          //     id: 'centerRate2',
          //     tips: this.data1.onlineNum,
          //     colorData: {
          //       textStyle: '#67e0e3',
          //       series: {
          //         color: ['#faf3a378', 'transparent'],
          //         dataColor: {
          //           normal: '#ff9800',
          //           shadowColor: '#fcebad'
          //         }
          //       }
          //     }
          //   }
          // ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    #center {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;

        .ctitle {
            padding: 10px;
            color: whitesmoke;
            height: 10%;

        }

        .percent {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex: 1;
            margin-top: 3%;

            .item {
                width: 50%;

                .textShow {
                    display: flex;
                    height: 40px;
                    justify-content: center;
                    line-height: 48px;
                    height: 48px;
                    font-size: 18px
                }

                .textColor1 {
                    color: #3fc0fb;
                }

                .textColor2 {
                    color: #ff9800;;
                }

                .textColor3 {
                    color: #277aec;;
                }
            }

            span {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
