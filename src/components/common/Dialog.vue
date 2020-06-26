<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="50%">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'alertAddressDialog',
  props: {
    isShow: {
      type: Boolean,
      default:false
    }
  }
}
</script>

<style>

</style>