<template>
  <el-dialog
    :title="'修改地址'"
    :visible.sync="isShow"
    width="50%"
    @close="closeDialog">
    
    <el-form :model="addressForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="省市区\县" prop="address1">
        <el-cascader :props="casProps" :options="cityData" v-model="addressForm.address1"/>
      </el-form-item>
      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="addressForm.address2"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = !isShow">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template> 

<script>
import cityData from '@/common/citydata'

export default {
  name: 'AlertAddressDialog',
  data() {
    return {
      isShow: false,
      // 验证规则
      rules: {
        address1: [
          { required: true, message: '请选择地区', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      // 绑定数据
      addressForm: {
        address1: [],
        address2: ''
      },
      // 城市数据
      cityData,
      // 配置对象
      casProps: {
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    closeDialog() {
      this.$refs.ruleForm.resetFields()
    },
    confirm() {
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.isShow = false
          return this.$message.success('地址修改成功！')
        } else return this.$message.error('请完成表单信息')
      })
    }
  }
}
</script>

<style>

</style>