<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" >
    <el-form-item label="商品名称" prop="goods_name">
      <el-input v-model="ruleForm.goods_name" @blur="inputBlur"/>
    </el-form-item>
    <el-form-item label="商品价格" prop="goods_price">
      <el-input v-model="ruleForm.goods_price" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @blur="inputBlur"/>
    </el-form-item>
    <el-form-item label="商品重量" prop="goods_weight">
      <el-input v-model="ruleForm.goods_weight" @blur="inputBlur"/>
    </el-form-item>
    <el-form-item label="商品数量" prop="goods_number">
      <el-input v-model="ruleForm.goods_number" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @blur="inputBlur"/>
    </el-form-item>
    <el-form-item label="商品分类" prop="goods_cate">
      <el-cascader
        v-model="ruleForm.goods_cate"
        :options="ruleForm.cateInfo"
        :props="cascaderProps"
        @change="handleChange"
        clearable
        @blur="inputBlur"/>
    </el-form-item>
  </el-form>
</template>

<script>
// imComponents
import { getCategoryList } from 'network/Goods_list'
import { mapGetters } from 'vuex'

export default {
  name: 'BasicInfo', 
  data() {
    return {
      // 表单数据绑定
      ruleForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cate: [],
        // 请求到的商品分类数据
        cateInfo: [],
      },
      // 表单验证规则
      rules: {
        goods_name: [
          { required: true !== '', message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true !== '', message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true !== '', message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true !== '', message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cate: [
          { required: true !== '', message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      // cascader配置
      cascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      }
    }
  },
  computed: {
    ...mapGetters(['getAddParams'])
  },
  methods: {
    // 请求cascader参数
    _getCategoryList() {
      getCategoryList().then(res => {
        if(res.meta.status === 200) {
          this.ruleForm.cateInfo = res.data
        } else {
          console.log(res.meta.msg)
        }
      })
    },
    // cascader选择改变时触发
    handleChange() {
      this.$store.commit('searchCateId', this.ruleForm.goods_cate)
      this.$bus.$emit("cateIdChange")
      if(this.ruleForm.goods_cate.length !== 0) {
        this.$store.commit('pushValid', 0)
      }else {
        this.$store.commit('deleteValid', 0)
      }
    },
    // 验证表单
    inputBlur() {
      this.$refs.ruleFormRef.validate((valid, msg) => {
        const Obj = {
          res: valid,
          msg: valid ? '表单验证通过' : '请完善“基本信息”页表单内容！'
        }
        this.$store.commit('searchValidMsg', Obj)
        if(valid) {
          this.$store.commit('searchValidMsg', 'basicValid')
          this.$emit('formFinish', this.ruleForm)
        }
      })
    }
  },
  created() {
    this._getCategoryList()
  },
  deactivated() {
    this.$store.commit('pushValid', 1)
    this.inputBlur()
  },
  activated() {
    console.log('load basic')
  }
}
</script>

<style scoped>
.el-input {
  width: 850px;
}
</style>