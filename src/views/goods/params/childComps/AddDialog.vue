<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="50%"
    @close="closeDialog">

    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item :label="formTitle" prop="inputData">
        <el-input v-model="formData.inputData" @keyup.enter.native="handleConfirm"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = !isShow">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addPrams } from 'network/Goods'

export default {
  name: 'AddDialog',
  data() {
    return {
      isShow: false,
      // 绑定表单数据
      formData: {
        inputData: ''
      },
      // 表单验证规则
      rules: {
        inputData: [
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
    // 点击确定
    handleConfirm( ) {
      const params = {
        id : this.currentId,
        attr_name : this.formData.inputData,
        attr_sel : this.tab,
      }
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          addPrams(params).then(res => {
            if(res.meta.status === 201) {
              this.isShow = !this.isShow
              this.$bus.$emit('updateCatePramas')
              this.$message.success('添加成功！')
            } else {
              return this.$message.error(res.meta.msg)
            }
          })
        } else {
          return this.$message.error('表单不能为空！')
        }
      })
    },
    // 清空表单
    closeDialog() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>

</style>