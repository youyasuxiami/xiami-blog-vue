<template>
  <div id="center">
    <div class="percent">
      <div class="item">
        <span>
					<div
            style="border-radius:4px; background-color: #3fc0fb;width: 8px; height: 8px;line-height: 8px;margin-top: 5px;">
          </div>
          <div style="font-size: 14px">
            本月新增用户
          </div>
				</span>
        <centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" style="margin-top: 2px"/>
      </div>
      <div class="item">
        <span>
					<div
            style="border-radius:4px; background-color: #ff9800;width: 8px; height: 8px; line-height: 8px;margin-top: 5px;">
          </div>
          <div style="font-size: 14px">
            今日在线用户
          </div>

				</span>
        <centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" style="margin-top: 2px"/>
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
        data1:{},
        // 资产情况（在线/启动）的组件复用数据
        rate: []
      }
    },
    created() {
      this.initData();
    },
    methods:{
      initData() {
        getAddNumAndOnlineNum().then(response => {//这是json字符串请求
          this.data1=response.data;
          this.rate=[{
            id: 'centerRate1',
            tips: this.data1.addNum,
            colorData: {
              textStyle: '#3fc0fb',
              series: {
                color: ['#00bcd44a', 'transparent'],
                dataColor: {
                  normal: '#03a9f4',
                  shadowColor: '#97e2f5'
                }
              }
            }
          },
            {
              id: 'centerRate2',
              tips: this.data1.onlineNum,
              colorData: {
                textStyle: '#67e0e3',
                series: {
                  color: ['#faf3a378', 'transparent'],
                  dataColor: {
                    normal: '#ff9800',
                    shadowColor: '#fcebad'
                  }
                }
              }
            }
          ]
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
      }

      span {
        display: flex;
        justify-content: center;
      }
    ;
    }
  }
</style>
