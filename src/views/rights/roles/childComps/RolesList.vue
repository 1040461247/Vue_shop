<template>
  <div class="rolesList">
    <el-table :data="rolesList" border stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 下拉界面 -->
          <roles-list-expand :scope="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column type="index"/>
      <el-table-column label="角色名称" prop="roleName"/>
      <el-table-column label="角色描述" prop="roleDesc"/>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="putRoles(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoles(scope.row)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import RolesListExpand from './RolesListExpand'
import { deleteRoles } from 'network/Rights'

export default {
  name: 'RolesList',
  components: {
    RolesListExpand
  },
  props: {
    rolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 编辑角色信息
    putRoles(rolesInfo=null) {
      this.$bus.$emit('putRoles', rolesInfo)
    },
    // 删除角色信息
    deleteRoles(rolesInfo) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoles(rolesInfo.id).then(res => {
          if(res.meta.status == 200) {
            this.$emit('deleteSuccess')
            this.$message.success(res.meta.msg)
          }else return this.$message.error(res.meta.msg)
        })
      }).catch((err) => {
        return console.log('取消删除或:' + err)      
      });
    },
    // 分配角色权限
    showSetRightDialog(info) {
      this.$bus.$emit('showSetRightDialog', info)
    }
  }
}
</script>

<style scoped>
.rolesList {
  margin-top: 20px;
}
</style>