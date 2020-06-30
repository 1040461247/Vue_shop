<template>
  <div class="reports">
    <breadcrumb :home="'首页'" :tagArray="['数据统计', '数据报表']"/>

    <el-card>
      <div id="main" style="width: 1000px; height: 500px; ">

      </div>
    </el-card>
  </div>
</template>

<script>
// imComponents
import Breadcrumb from 'components/content/Breadcrumb'
import _ from 'lodash'
// imNetwork
import { getReports } from 'network/Reports'
// 1 导入Echarts
import echarts from 'echarts'

export default {
  name: 'Reports',
  components: {
    Breadcrumb
  },
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  mounted() {
    // 2 初始化Echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 3 准备Echarts数据和配置项
    getReports().then(res => {
      if(res.meta.status == 200) {
        // _.merge是lodash中提供的一个方法，用于两个对象合并
        const result = _.merge(res.data, this.options)
        // 4 展示数据
        myChart.setOption(result)
      } else {
        this.$message.error(res.meta.msg)
      }
    })
  }
}
</script>

<style>

</style>