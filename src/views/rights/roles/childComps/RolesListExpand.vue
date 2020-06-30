<template>
  <div class="rolesListExpand">
    <el-row :class="['btBorder', 'vcenter', index1 === 0 ? 'tpBorder': '']" v-for="(item1, index1) in scope.children" :key="item1.id">
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-tag closable @close="deleteRight(item1.id)">{{item1.authName}}</el-tag>
        <i class="el-icon-caret-right"/>
      </el-col>
      <!-- 渲染2、3级权限 -->
      <el-col :span="19">
        <el-row v-for="(item2, index2) in item1.children" :key="item2.id" :class="['vcenter', index2 === 0 ? '': 'tpBorder']">
          <!-- 二级权限 -->
          <el-col :span="6">
            <el-tag closable @close="deleteRight(item2.id)" type="success">{{item2.authName}}</el-tag>
            <i class="el-icon-caret-right"/>
          </el-col >
          <!-- 三级权限 -->
          <el-col :span="18">
            <el-tag closable @close="deleteRight(item3.id)" v-for="item3 in item2.children" :key="item3.id" type="warning">{{item3.authName}}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteRights } from 'network/Rights'

export default {
  name: 'RolesListExpand',
  data() {
    return {
      roleInfo: {
        roleId: null,
        rightId: null
      }
    }
  },
  props: {
    scope: {
      type: Object,
      default() { 
        return {}
      }
    }
  },
  methods: {
    // 根据id删除对应权限
    deleteRight(rightId) {
      // 存放角色数据
      this.roleInfo.roleId = this.scope.id
      this.roleInfo.rightId = rightId
      // 弹框提示是否删除
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteRights(this.roleInfo).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('权限取消成功！')
            console.log(res.data)
            this.scope.children = res.data
          }else this.$message.error(res.meta.msg)
        })
      }).catch((err) => {
        return console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.btBorder {
  border-bottom: 1px solid #eee;
}
.tpBorder {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>