<template>
    <el-dialog
      title="添加角色"
      :visible.sync="showDialog"
      width="50%"
      @close="closeDialog">
      
      <el-form :model="rolesData" :rules="rules" ref="addRolesRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesData.roleDesc" @keyup.enter.native="addRoles(1)"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoles(0)">取 消</el-button>
        <el-button type="primary" @click="addRoles(1)">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { postRoles } from 'network/Rights'

export default {
  name: 'addRolesDiaLog',
  data() {
    return {
      // 对话框是否显示
      showDialog: false,
      // 对话框信息
      rolesData: {
        roleName: '',
        roleDesc: ''
      },
      // 表单验证规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addRoles(num) {
      if(num === 1) {
        //  表单预校验
        this.$refs.addRolesRef.validate((res, obj) => {
          if(res) {
            postRoles(this.rolesData).then(res => {
              if(res.meta.status == 201) {
                this.$emit('addSuccess', res.data)
                this.$message.success('编辑成功！')
                this.showDialog = !this.showDialog
              }else {
                this.$message.error(res.meta.msg)
              }
            })
          }else {
            this.$message.error('请输入正确表单信息！')
          }
        })
      }else {
        this.showDialog = !this.showDialog
      }
    },
    // 关闭对话框重置表单
    closeDialog() {
      this.$refs.addRolesRef.resetFields()
    }
  },
  created() {
    // 监听事件总线中按钮点击状态
    this.$bus.$on('addRoles', () => {
      this.showDialog = !this.showDialog
    })
  }
}
</script>

<style>

</style>