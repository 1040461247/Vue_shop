<template>
  <el-dialog
    title="编辑分类"
    :visible.sync="showDialog"
    width="50%">
    
    <el-form :model="rowData" :rules="rules" ref="updateFormRef" label-width="100px" @submit.native.prevent>
      <el-form-item label="分类名改成" prop="cat_name">
        <el-input v-model="rowData.cat_name" @keyup.enter.native="confirmUpdate" ref="formItem"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = !showDialog">取 消</el-button>
      <el-button type="primary" @click="confirmUpdate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { upodateCategory } from 'network/Goods'

export default {
  name: 'UpdateDialog',
  data() {
    return {
      showDialog: false,
      // 当前行数据
      rowData: {},
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    confirmUpdate() {
      this.$refs.updateFormRef.validate(valid => {
        if(valid) {
          upodateCategory(this.rowData).then(res => {
            if(res.meta.status === 200) {
              this.$emit('updateData')
              this.$message.success('更新成功！')
              this.showDialog = !this.showDialog
            } else {
              return this.$message.error(res.meta.msg)
            }
          })
        } else {
          return this.$message.error('请填写正确信息！')
        }
      })
    }
  },
  created() {
    this.$bus.$on('updateCategory', rowData => {
      this.showDialog = !this.showDialog
      this.rowData = rowData
      console.log(this.rowData)
    })
  }
}
</script>

<style>

</style>