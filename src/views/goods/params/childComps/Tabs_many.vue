<template>
  <div class="dynamic">
    <el-button @click="clickAdd" type="primary" :disabled="this.$store.state.goodsCascaderIsNull" class="addButton">添加参数</el-button>
    <!-- 表格区域 -->
    <el-table 
      :expand-row-keys="expands" 
      :row-key="getRowKeys" 
      :data="tableData" 
      border stripe 
      @expand-change="openExpand">

      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag 
            class="expandTag"
            :key="item"
            closable 
            v-for="(item, index) in scope.row.attr_vals"
            @close="deleteTag(index, scope.row)">
            {{item}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          />
          <el-button v-else class="button-nk.naew-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
        </template>
      </el-table-column>

      <el-table-column type="index"/>
      <el-table-column label="参数名称" prop="attr_name"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editMany(scope.row)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteMany(scope.row)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加对话框 -->
    <add-dialog 
      ref="manyAddRef"
      :tab="'many'"
      :title="'添加动态参数'"
      :formTitle="'动态参数'"
      :currentId="currentId"/>

    <!-- 编辑对话框 -->
    <edit-dialog
      ref="manyEditRef"
      :tab="'many'"
      :title="'添加动态参数'"
      :formTitle="'动态参数：'"
      :currentId="currentId"/>
  </div>
</template>

<script>
import { lisIsDisabled } from '@/common/mixin'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import { deletePrams } from 'network/Goods'
import { setPramas } from 'network/Prams'

export default {
  name: 'Tabs_dynamic',
  mixins: [ lisIsDisabled ],
  components: {
    AddDialog,
    EditDialog
  },
  data() {
    return {
      // 当前行数据
      currentExpandData: {},
      // 控制tag按钮与文本框的输入显示
      inputVisible: false,
      // tag文本框中输入的内容
      inputValue: '',
      // 控制一次展开一行
      expands: []
    }
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    currentId: {
      type: Number,
      required: true
    }
  },
  methods: {
    clickAdd() {
      this.$refs.manyAddRef.isShow = !this.$refs.manyAddRef.isShow
    },
    deleteMany(rowData) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deletePrams(rowData).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('删除成功！')
            this.$bus.$emit('updateCatePramas')
          } else {
            return this.$message.error(res.meta.msg)
          }
        })
      }).catch((err) => {
        return console.log(err)
      })
    },
    editMany(rowData) {
      this.$refs.manyEditRef.isShow = !this.$refs.manyEditRef.isShow
      this.$refs.manyEditRef.rowData = rowData
    },
    getRowKeys(row) {
      return row.attr_id
    },
    // 打开展开行触发
    openExpand(rowData, expandedRows) {
      // 一次只展开一行
      if (expandedRows.length) {
        this.expands = []
        if (rowData) {
          this.expands.push(rowData.attr_id)// 每次push进去的是每行的ID
        }
      } else {
        this.expands = []// 默认不展开
      }
      // 获取tag数据
      this.tableData.forEach((item, index) => {
        if(item.attr_id == rowData.attr_id) {
          if(item.attr_vals !== '' && typeof(item.attr_vals) == 'string') {
            item.attr_vals = item.attr_vals.split(' ')
          }
        }
      })
    },
    // tag-input失去焦点
    handleInputConfirm(rowData) {
      this.inputVisible = false
      if(this.inputValue.trim().length === 0 | rowData.attr_vals.indexOf(this.inputValue) !== -1) {
        this.inputValue = ''
        this.$message.warning('添加失败：参数为空或参数重复！')
      } else {
        rowData.attr_vals.push(this.inputValue.trim())
        this.inputValue = ''
        rowData.attr_NumVals = rowData.attr_vals
        rowData.attr_NumVals = rowData.attr_NumVals.join(' ')
        // axios
        setPramas(rowData).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('更新成功')
          } else {
            console.log(res)
          }
        })
      }
    },
    // 显示tag-input
    showInput(rowData) {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 删除标签
    deleteTag(index, row) {
      row.attr_vals.splice(index, 1)
      row.attr_NumVals = row.attr_vals
      row.attr_NumVals = row.attr_NumVals.join(' ')
      setPramas(row).then(res =>{
        if(res.meta.status === 200) {
          return this.$message.success('删除成功！')
        } else {
          return this.$message.error(res.meta.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.addButton {
  margin-bottom: 15px;
}
.expandTag {
  margin-right: 10px;
}
.input-new-tag {
  width: 90px;
}

</style>