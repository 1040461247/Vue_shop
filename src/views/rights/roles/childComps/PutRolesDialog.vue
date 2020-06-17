<template>
  <el-dialog
  title="编辑角色信息"
  :visible.sync="showDialog"
  width="50%">
  
  <el-form :model="currentInfo" :rules="rules" ref="putRolesRef" label-width="100px">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="currentInfo.roleName" @keyup.enter.native="putRoles(1)"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="currentInfo.roleDesc" @keyup.enter.native="putRoles(1)"></el-input>
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="putRoles(0)">取 消</el-button>
    <el-button @click="putRoles(1)">确 定</el-button>
  </span>
</el-dialog>
</template>
 
<script>
import { putRoles } from 'network/Rights'

export default {
  name: 'PutRolesDialog',
  data() {
    return {
      currentInfo: {
        id: null,
        roleName: '',
        roleDesc: ''
      },
      showDialog: false,
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
    putRoles(num) {
      if(num === 1) {
        //  表单预校验
        this.$refs.putRolesRef.validate((res, obj) => {
          if(res) {
            putRoles(this.currentInfo).then(res => {
              if(res.meta.status == 200) {
                this.$emit('putSuccess', res.data)
                this.$message.success('编辑成功！')
                this.showDialog = !this.showDialog
              }else {
                this.$message.error(res.meta.msg)
                console.log(res)
              }
            })
          }else {
            this.$message.error('请输入正确表单信息！')
          }
        })
      }else {
        this.showDialog = !this.showDialog
      }
    }
  },
  created() {
    // 监听编辑按钮点击
    this.$bus.$on('putRoles', (msg) => {
      this.currentInfo.id = msg.id
      this.currentInfo.roleName = msg.roleName
      this.currentInfo.roleDesc = msg.roleDesc
      this.showDialog = !this.showDialog
    })
  }
}
</script>

<style>

</style>