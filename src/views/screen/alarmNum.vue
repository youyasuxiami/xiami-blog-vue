<template>
	 <div id="center">
		 <div class="ctitle">
			 <el-row type="flex" justify="center">
				 
				 <el-col :span="14" :offset="5">
					<span style="color:#5cd9e8">
					<svg-icon icon-class="alanum"></svg-icon>
					</span> <span class="fs-xl text mx-2">告警规则数量</span> 
				 </el-col>
				 <!-- <el-col :span="1">
					 <div style="border-radius:4px;background-color: #3fc0fb;width: 8px; height: 8px;line-height: 8px;">
					 </div>
				 </el-col> -->
				 <el-col :span="5">
					   <span >
				     总:{{this.trigger.total}}
					 </span> 

				 </el-col>
			 </el-row>
			
		 </div>
	<div class="percent">
	  
	  <div class="item bg-color-black" >
	    <centerChart :id="rate[3].id" :tips="rate[3].tips" :colorObj="rate[3].colorData" />
	  		<span>启用</span>
	  </div>
	  <div class="item bg-color-black">
	    <centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
		<span>禁用</span>
	  </div>
	<div class="item bg-color-black">
	   <centerChart :id="rate[2].id" :tips="rate[2].tips" :colorObj="rate[2].colorData" />
	 		<span>正常</span>
	 </div>
	 <div class="item bg-color-black" style="margin-left: 0px;">
	   <centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
	    <span>异常</span>
	 </div> 
	</div>
	<!-- <div class="percent">
		<div class="item bg-color-black">
		  <centerChart :id="rate[2].id" :tips="rate[2].tips" :colorObj="rate[2].colorData" />
				<span>正常</span>
		</div>
		<div class="item bg-color-black" style="margin-left: 0px;">
		  <centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
		   <span>异常</span>
		</div> 
	</div> -->
	
	
	</div>	
</template>

<script>
	import  centerChart from "./sub/subAlarm.vue"
	export default{
		components:{
			centerChart
		},
		props:["trigger"],
		watch: {
			trigger: {
				handler(newValue, oldValue) {
					this.trigger.problem=newValue.problem;
					this.trigger.disabled=newValue.disabled;
					this.trigger.ok=newValue.ok;
					this.trigger.enabled=newValue.enabled;
		
				},
				deep: true,
				}
			},
		data(){
			return{
				// 资产情况（在线/启动）的组件复用数据
				rate: [
				  {
				    id: "problem",
				    tips:this.trigger.problem,
				    colorData: {
				      textStyle: "#3fc0fb",
				      series: {
				        color: ["#ffe6a7", "transparent"],
				        dataColor: {
				          normal: "#ff9800",
				          shadowColor: "#97e2f5"
				        }
				      }
				    }
				  },
				  {
				    id: "disabled",
				    tips: this.trigger.disabled,
				    colorData: {
				      textStyle: "#67e0e3",
				      series: {
				        color: ["#ffb7aa", "transparent"],
				        dataColor: {
				          normal: "#ff360e",
				          shadowColor: "#97e2f5"
				        }
				      }
				    }
				  },
				  {
				    id: "ok",
				    tips: this.trigger.ok,
				    colorData: {
				      textStyle: "#67e0e3",
				      series: {
				        color: ["#77af6e", "transparent"],
				        dataColor: {
				          normal: "#46d830",
				          shadowColor: "#97e2f5"
				        }
				      }
				    }
				  },
				  {
				    id: "enabled",
				    tips: this.trigger.enabled,
				    colorData: {
				      textStyle: "#67e0e3",
				      series: {
				        color: ["#97e2f5", "transparent"],
				        dataColor: {
				          normal: "#3EACE5",
				          shadowColor: "#97e2f5"
				        }
				      }
				    }
				  },
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	#center {
	  display: flex;
	  flex-direction: column;
	  .ctitle{
		 padding-top: 15px;
		 font-size: 14px;
	  }
    .percent {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
	  margin-left: 20px;
      .item {
        width: 25%;
        span {
          display: flex;
          justify-content: center;
        }
      }
      
    }
  }

</style>