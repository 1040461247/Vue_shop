<template>
  <el-dialog
  title="分配权限"
  :visible.sync="showDialog"
  width="50%"
  @close="closeDialog">
    <el-tree 
      show-checkbox
      node-key='id'
      default-expand-all 
      :data="allRightInfo" 
      :props="treeInfo"
      :default-checked-keys="defaultKeys"
      ref="treeRef"
    />
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRightsTree, getRolesRights } from 'network/Rights'

export default {
  name: 'SetRIghtDialog',
  data() {
    return {
      rightInfo: {},
      showDialog: false,
      allRightInfo: [],
      treeInfo: {
        children: 'children',
        label: 'authName'
      },
      defaultKeys: []
    }
  },
  methods: {
    // 通过递归获取当前角色下所有三级权限的id
    getDefaultKeys(node, arr) {
      // 递归终止条件
      if(!node.children) {
        return arr.push(node.id)
      }
      // 自己调用自己
       node.children.forEach(item => this.getDefaultKeys(item, arr))
    },
    // 当关闭对话框后清空defaultKeys数组
    closeDialog() {
      this.defaultKeys = []
    },
    // 调用接口，分配角色权限
    confirmDialog() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const rids = keys.join(',')
      getRolesRights(this.rightInfo.id, rids).then(res => {
        if(res.meta.status === 200) {
          this.$message.success('权限分配成功！')
          this.$emit('renovate')
          this.showDialog = !this.showDialog
        }
      })
    }
  },
  created() {
    this.$bus.$on('showSetRightDialog', (info) => {
      // 获取当前角色下的所有三级权限的id
      this.getDefaultKeys(info, this.defaultKeys)
      // 打开对话框
      this.showDialog = !this.showDialog
      // 存入当前行数据
      this.rightInfo = info
      // 请求所有权限树形数据
      getRightsTree().then(res => {
        this.allRightInfo = res.data
      })
    })
  }
}
</script>

<style scoped>

</style>