<template>
  <div class="roles">
    <bread-crumb/>
    
    <el-card>
      <add-roles/>
      <roles-list :rolesList="rolesList" @deleteSuccess="_getRoles"/>
    </el-card>

    <add-roles-dia-log @addSuccess="_getRoles"/>
    <put-roles-dialog @putSuccess="_getRoles"/>
    <set-right-dialog @renovate="_getRoles"/>
  </div>
</template>

<script>
// 组件相关导入
import BreadCrumb from './childComps/BreadCrumb'
import AddRoles from './childComps/AddRoles'
import RolesList from './childComps/RolesList'
import AddRolesDiaLog from './childComps/AddRolesDiaLog'
import PutRolesDialog from './childComps/PutRolesDialog'
import SetRightDialog from './childComps/SetRightDialog'
// 网络相关导入
import { getRoles } from 'network/Rights'

export default {
  name: 'Roles',
  components: {
    BreadCrumb,
    AddRoles,
    RolesList,
    AddRolesDiaLog,
    PutRolesDialog,
    SetRightDialog
  },
  data() {
    return {
      rolesList: []
    }
  },
  methods: {
    // 请求角色列表数据
    _getRoles() {
      getRoles().then(res => {
        this.rolesList = res.data
        console.log('刷新了角色列表')
      })
    }
  },
  created() {
    this._getRoles()
  }
}
</script>

<style scoped>

</style>