<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="50%"
    @close="closeDialog">

    <el-form :model="rowData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item :label="formTitle" prop="attr_name">
        <el-input v-model="rowData.attr_name" @keyup.enter.native="handleConfirm"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = !isShow">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editPrams } from 'network/Goods'

export default {
  name: 'EditDialog',
  data() {
    return {
      isShow: false,
      // 当前行信息
      rowData: {},
      // 表单验证规则
      rules: {
        attr_name: [
          { type: 'string', required: true, message: "参数不能为空", trigger: "blur" },
        ]
      }
    }
  },
  props: {
    tab: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'title无参数'
    },
    formTitle: {
      type: String,
      default: 'formTitle无参数'
    },
    currentId: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 关闭时清空表单
    closeDialog() {
      this.$refs.ruleForm.resetFields()
    },
    // 发送网络请求
    handleConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          editPrams(this.rowData).then(res => {
            if(res.meta.status === 200) {
              this.isShow = !this.isShow
              this.$bus.$emit('updateCatePramas')
              this.$message.success('编辑成功！')
            } else {
              return this.$message.error(res.meta.msg)
            }
          })
        } else {
          return this.$message.error('表单不能为空！')
        }
      })
    }
  }
}
</script>

<style>

</style>