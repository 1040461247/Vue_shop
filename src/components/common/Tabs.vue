<template>
  <el-tabs :tab-position="'left'" v-model="activeItem" @click.native="clickTabItem(activeItem)" :before-leave="beforeLeave">
    <el-tab-pane v-for="item in tabsLabel" :key="item" :label="item">
      <keep-alive>
        <basic-info @formFinish="formFinish" ref="basic_info" v-if="activeItem == 0"/>
        <goods-params @paramsFinish="paramsFinish" ref="goods_params" v-if="activeItem == 1"/>
        <goods-property @propertyFinish="propertyFinish" ref="goods_property" v-if="activeItem == 2"/>
        <goods-img @imgFinish="imgFinish" ref="goods_img" v-if="activeItem == 3"/>
        <goods-content @contentFinish="contentFinish" ref="goods_content" v-if="activeItem == 4"/>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// imComponents
import BasicInfo from 'views/goods/goods/AddGoodsComps/BasicInfo.vue'
import GoodsParams from 'views/goods/goods/AddGoodsComps/GoodsParams'
import GoodsProperty from 'views/goods/goods/AddGoodsComps/GoodsProperty'
import GoodsImg from 'views/goods/goods/AddGoodsComps/GoodsImg'
import GoodsContent from 'views/goods/goods/AddGoodsComps/GoodsContent'
// imNetwork
import { getPramasList, addGoods } from 'network/Goods_list'
// imProp
import { mapGetters } from 'vuex'

export default {
  name: 'Tabs',
  components: {
    BasicInfo,
    GoodsParams,
    GoodsProperty,
    GoodsImg,
    GoodsContent
  },
  data() {
    return {
      activeItem:0,
      addParams: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      }
    }
  },
  props: { 
    tabsLabel: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getCateId', 'getValidForm', 'getValidMsg', 'getAddParams'])
  },
  methods: {
    // 判断是否能跳转tab
    beforeLeave(activeI, oldI) {
      // 选择商品分类后才可跳转下一个tab
      if(activeI == 0) return true
      if(this.getValidForm.indexOf(Number(oldI)) == -1) {
        oldI == 0 && this.$message.error('请选择商品分类')
        return false
      }
      if(this.getValidForm.indexOf(Number(oldI)) !== -1) return true
    },
    // 点击tab时触发
    clickTabItem(activeItem) {
      // 添加到Vuex中并发送事件
      this.$store.commit('searchIndex', activeItem)
      this.$bus.$emit('indexChange', activeItem)
    },
    // basic传过来的数据
    formFinish({ goods_name, goods_price, goods_weight, goods_number, goods_cate }) {
      this.addParams.goods_name = goods_name
      this.addParams.goods_price = goods_price
      this.addParams.goods_weight = goods_weight
      this.addParams.goods_number = goods_number
      this.addParams.goods_cat = goods_cate.join(',')
    },
    // content传过来的数据
    contentFinish(msg) {
      this.addParams.goods_introduce = msg
    },
    // img传过来的数据
    imgFinish(pics) {
      this.addParams.pics = pics
    },
    // params传过来的数据
    paramsFinish(attrs) {
      this.addParams.attrs = [
        ...attrs,
        ...this.addParams.attrs
      ]
    },
    // property
    propertyFinish(attrs) {
      this.addParams.attrs = [
        ...attrs,
        ...this.addParams.attrs
      ]
    }
  },
  mounted() {
    // 监听添加商品按钮点击
    this.$bus.$on('addGoodsConfirm', () => {
      const valid = this.getValidMsg.find(item => {
        return item.res == false
      })
      if(valid.msg !== 0 && valid.msg !== '请完善“基本信息”页表单内容！') {
        return this.$message.error(valid.msg)
      } else {
        addGoods(this.addParams).then(res => {
          if(res.meta.status === 201) {
            this.$message.success('商品添加成功！')
            this.$router.replace('/goods')
            return 
          } else {
            console.log(res)
            return this.$message.error(res.meta.msg)
          }
        })
      }
    })
  }
}
</script>

<style>

</style>