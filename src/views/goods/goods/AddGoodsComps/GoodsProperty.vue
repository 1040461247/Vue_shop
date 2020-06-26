<template>
  <el-form :data="propertyList" label-position="top">
    <el-form-item :label="item.attr_name" v-for="item in propertyList" :key="item.attr_id">
      <el-input v-model="item.attr_vals"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
// imNetwork
import { getOnlyPramasList } from 'network/Goods_list'
// imCommon
import { mapGetters } from 'vuex'

export default {
  name: 'GoodsProperty',
  data() {
    return {
      propertyList: []
    }
  },
  computed: {
    ...mapGetters(['getCateId'])
  },
  methods: {
    _getOnlyPramasList() {
      getOnlyPramasList(this.getCateId[this.getCateId.length-1]).then(res => {
        if(res.meta.status == 200) {
          this.propertyList = res.data
        } else {
          console.log(res)
        }
      }) 
    }
  },
  created() {
    this._getOnlyPramasList()
  }
  ,
  deactivated() {
    if(this.propertyList.length !== 0) {
      const attrs = []
      this.propertyList.forEach(item => {
        const newProperty = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
        attrs.push(newProperty)
      })
      this.$emit('propertyFinish', attrs)
    }
    this.$store.commit('pushValid', 3)
  }
}
</script>

<style>

</style>