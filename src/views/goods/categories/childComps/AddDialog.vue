<template>
  <el-dialog
    title="添加分类"
    :visible.sync="showDialog"
    width="50%"
    @close="closeDialog">
    <el-form :model="addData" :rules="rules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
      <!-- Input -->
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addData.cat_name"></el-input>
      </el-form-item>
      <!-- Cascader -->
      <el-form-item label="父级分类：">
        <el-cascader
          v-model="selectedKeys"
          :options="pidData" 
          :props="cascaderProps"
          @change="handleCasChange"
          clearable>
        </el-cascader>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = !showDialog">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategory, getCategoryList }  from 'network/Goods.js'

export default {
  name: 'AddDialog',
  data() {
    return {
      showDialog: false,
      // 添加分类信息
      addData: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      // 校验规则
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      // 1、2级分类列表的数据
      pidData: [],
      // 级联选择器配置对象
      cascaderProps: { 
        expandTrigger: 'hover' ,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // Cascader中选中父级分类的id数组
      selectedKeys: []
    }
  },
  methods: {
    // 获取父级分类的数据列表
    _getPidList() {
      getCategoryList({ type:2 }).then(res => {
        if(res.meta.status !== 200) {
          return console.log(res.meta.msg)
        }else {
          return this.pidData = res.data
        }
      })
    },
    // 当Cascader选择项改变时触发
    handleCasChange() {
      if(this.selectedKeys.length > 0) {
        this.addData.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addData.cat_level = this.selectedKeys.length
        return 
      } else {
        this.addData.cat_pid = 0
        this.addData.cat_level = 0
      }
    },
    // 确认添加商品分类
    confirmAdd() {
      // 预校验
      this.$refs.addFormRef.validate(valid => {
        if(valid) {
          addCategory(this.addData).then(res => {
            if(res.meta.status === 201) { 
              this.$emit('updateData')
              this.$message.success('添加成功！')
              this.showDialog = !this.showDialog
            } else {
              console.log(res)
              return this.$message.error(res.meta.msg)
            }
          })
        } else {
          return this.$message.error('请填写正确表单信息！')
        }
      })
    },
    // 重置表单数据
    closeDialog() {
      this.$refs.addFormRef.resetFields()
      this.addData.cat_name = ''
      this.addData.cat_pid = 0
      this.addData.cat_level = 0
      this.selectedKeys = []
      console.log('Close && Clear form')
    }
  },
  created() {
    this.$bus.$on('clickAddButton', () => {
      this._getPidList()
      this.showDialog = !this.showDialog
    })
  }
}
</script>

<style>

</style>