<template>
  <div class="goods-content">
    <quill-editor
      v-model="introduce"
    />

    <el-button type="primary" @click="addGoods">添加商品</el-button>
  </div>
</template>

<script>
export default { 
  name: 'GoodsContent',
  data() {
    return {
      introduce: ''
    }
  },
  methods: {
    addGoods() {
      const valid = this.introduce.length !== 0 ? true : false 
      const Obj = {
        res: valid,
        msg: valid ? '商品描述已填写' : '请填写商品描述'
      }
      this.$store.commit('searchValidMsg', Obj)
      if(valid) {
        this.$emit('contentFinish', this.introduce)
      }
      this.$bus.$emit('addGoodsConfirm', )
    }
  }
}
</script>

<style scoped>
.el-button {
  margin-top: 15px;
}
</style>