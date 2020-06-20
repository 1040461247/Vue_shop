<template>
  <tree-table
    :data="categoryData.result"
    :columns="columns"
    :selection-type="false"
    :expand-type="false"
    show-index
    index-text
    border
  >
    <template slot="isOk" slot-scope="scope">
      <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: green" />
      <i v-if="scope.row.cat_deleted === true" class="el-icon-error" style="color: red" />
    </template>
    <template slot="order" slot-scope="scope">
      <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
      <el-tag v-if="scope.row.cat_level === 1" type="success">二级</el-tag>
      <el-tag v-if="scope.row.cat_level === 2" type="warning">三级</el-tag>
    </template>
    <template slot="opt" slot-scope="scope">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="updateCategory(scope.row)"
      >编辑</el-button>
      <el-button type="danger" icon="el-icon-edit" size="mini" @click="deleteCategory(scope.row)">删除</el-button>
    </template>
  </tree-table>
</template>

<script>
import { deleteCategory } from "network/Goods";

export default {
  name: "Table",
  data() {
    return {
      // tree-table列的数据
      columns: [
        // 数据源模板列
        {
          label: "分类名称",
          prop: "cat_name"
        },
        // 自定义模板列
        {
          label: "是否有效",
          type: "template",
          template: "isOk"
        },
        {
          label: "分类等级",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "opt"
        }
      ],
      deletePrams: {
        cat_id: 0
      }
    };
  },
  props: {
    // 商品分类数据
    categoryData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    updateCategory(rowData) {
      this.$bus.$emit("updateCategory", rowData);
    },
    deleteCategory(rowData) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteCategory(rowData.cat_id).then(res => {
          if (res.meta.status === 200) {
            this.$emit("updateData");
            this.$message.success("删除成功！");
          } else {
            return this.$message.error(res.meta.msg)
          }
        }).catch(err => {
          return console.log(err)
        })
      });
    }
  }
};
</script>

<style>
</style>