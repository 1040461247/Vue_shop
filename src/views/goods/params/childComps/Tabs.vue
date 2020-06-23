<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <many :tableData="tabData.many" :currentId="currentId"/>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
      <only :tableData="tabData.only" :currentId="currentId"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Many from './Tabs_many'
import Only from './Tabs_only'
import { getPramasList } from 'network/Goods'

export default {
  name: 'Tabs',
  components: {
    Many,
    Only,
  },
  data() {
    return {
      // 被激活的页签的名称
      activeName: 'many',
      // 被选中分类的id
      currentId: 0,
      // 请求到的页签数据
      tabData: {
        many: [],
        only: []
      }
    }
  },
  methods: {
    // 点击了tab更换页签
    handleClick() {
      this._getPramasList()
    },
    // 根据选择的分类id请求对应页签的数据
    _getPramasList() {
      getPramasList(this.currentId, this.activeName).then(res => {
        if(res.meta.status === 200) {
          if(this.activeName == 'many') {
            this.tabData.many = res.data
          } else if(this.activeName == 'only') {
            this.tabData.only = res.data
          }
        } else {
          return console.log(res.meta.msg)
        }
      })
    }
  },
  created() {
    // 请求当前页签数据
    this.$bus.$on('handleCascader', (currentId) => {
      this.currentId = currentId[currentId.length - 1]
      this._getPramasList()
    })
    // 监听页面刷新
    this.$bus.$on('updateCatePramas', this._getPramasList)
  }
}
</script>

<style scoped>
.el-tabs {
  margin-top: 10px;
}
</style>