<template>
  <el-dialog
    :title="'物流进度'"
    :visible.sync="isShow"
    width="50%">

    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in progressMsg"
        :key="index"
        :timestamp="activity.time">
        {{activity.context}}
      </el-timeline-item>
    </el-timeline>

  </el-dialog>
</template>

<script>
import { getProgress } from 'network/Order'

export default {
  name: 'ProgressDialog',
  data() {
    return {
      isShow: false,
      progressMsg: []
    }
  },
  methods: {
    _getProgress() {
      getProgress().then(res => {
        if(res.meta.status == 200) {
          this.progressMsg = res.data
        } else {
          return this.$message.error(res.meta.msg)
        }
      })
    }
  },
  created() {
    this._getProgress()
  }
}
</script>

<style>

</style>