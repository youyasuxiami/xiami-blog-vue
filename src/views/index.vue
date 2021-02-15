<template>

    <div id="index" class="bg">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <div v-else class="host-body">
            <div class="content">
                <el-row style="height: 100%;">
                    <el-col style="height: 100%;">
                        <!-- 上半部分 -->
                        <el-row style="height: 70%; ">
                            <el-col style="height:100%; display: flex;flex-direction: row;">
                                <!-- 最左边  start-->
                                <div class="left"
                                     style=" height: 100%;flex: 2; flex-direction: column; align-items: stretch;">
                                    <!--                    本月新增-->
                                    <dv-border-box-8 style="height: 20%;">
                                        <inven-status></inven-status>
                                    </dv-border-box-8>
                                    <!--                    文章类别-->
                                    <dv-border-box-12 style="height: 40%;">
                                        <city-info></city-info>
                                    </dv-border-box-12>
                                    <!--                    文章标签-->
                                    <dv-border-box-1 style="height: 40%;">
                                        <alarm-info></alarm-info>
                                    </dv-border-box-1>
                                </div>
                                <!-- 最左边  end-->

                                <!-- 中间  start-->
                                <div class="left"
                                     style="height: 100%; flex: 3; flex-direction: column; align-items: stretch; ">
                                    <dv-border-box-3 style="height: 100%;">
                                      <!--地图-->
                                        <topology-info></topology-info>
                                    </dv-border-box-3>
                                </div>
                                <!-- 中间  end-->

                                <!-- 最右边  start-->
                                <div class="left"
                                     style="height: 100%; flex: 2.5; flex-direction: column; align-items: stretch;">
                                    <!--最受欢迎的十大作者-->
                                    <dv-border-box-13 style="height: 60%;">
                                        <storage-top></storage-top>
                                    </dv-border-box-13>
                                    <!--黑名单数量-->
                                    <dv-border-box-12 style="height: 40%;">
                                        <city-num></city-num>
                                    </dv-border-box-12>
                                </div>
                                <!-- 最右边  end-->
                            </el-col>
                        </el-row>

                        <!-- 下半部分 -->
                        <el-row style="height: 30%;">
                            <el-col style="height:100%;display: flex; flex-direction: row;justify-content: flex-start;">
                                <dv-border-box-1 style="height: 100%; width: 30%;">
                                    <!--热门类别-->
                                    <cpu-top></cpu-top>
                                </dv-border-box-1>
                                <dv-border-box-4 style="height: 100%; width: 70%; " :color="['#6a3ff5', '#4529a2']">
                                    <!--操作日志-->
                                    <alarm-list></alarm-list>
                                </dv-border-box-4>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--    </dv-full-screen-container>-->
    </div>
</template>
<script>
  import api from '@/http/api'
  import InvenStatus from './screen/subInven.vue'
  import CityInfo from './screen/cityInfo.vue'
  import AlarmInfo from './screen/alarmInfo.vue'

  // 中间
  import TopologyInfo from './screen/topologyInfo.vue'
  import StorageTop from './screen/storageTop.vue'
  import CityNum from './screen/cityNum.vue'

  import CpuTop from './screen/cpuTop.vue'
  import AlarmList from './screen/alarmList.vue'

  export default {
    components: {
      InvenStatus,
      CityInfo,
      AlarmInfo,
      TopologyInfo,
      StorageTop,
      CityNum,
      CpuTop,
      AlarmList
    },
    data() {
      return {
        loading: true

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.cancelLoading()
      })

    },

    methods: {
      cancelLoading() {
        setTimeout(() => {
          this.loading = false
        }, 500)
      },
      fetchData() {
      }
    }
  }
</script>

<style lang="scss" scope>
    .bg {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0.2rem 0 0.2rem;
        background-image: url("../assets/pageBg1.png");
        background-size: cover;
        /*background-repeat:repeat;*/
        background-position: center center;
        color: white;

    }

    .host-body {
        flex: 1;
        flex-direction: column;
        justify-content: space-around;

        .header {
            width: 100%;
            height: 80px;
            flex: 2;
        }

        .content {
            flex: 2;
            width: 100%;
            height: calc(100% - 80px);
        }

    }

    .systime {
        color: #5cd9e8;
        font-size: 16px !important;
        font-weight: 800;
        margin-left: 10px;
    }
</style>
