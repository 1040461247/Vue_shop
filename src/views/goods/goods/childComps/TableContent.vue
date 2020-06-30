<template>
  <div class="wrapper">
    <el-table :data="goodsList.goods" border stripe>
      <el-table-column type="index"/>
      <el-table-column label="名称" prop="goods_name"/>
      <el-table-column label="商品价格(元)" prop="goods_price" width="100px"/>
      <el-table-column label="商品重量" prop="goods_weight" width="80px"/>
      <el-table-column label="创建时间" prop="add_timed" width="140px">
        <template slot-scope="scope">
          {{scope.row.add_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="alGoods(scope.row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletegoods(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 修改Dialog(懒得封装组建了，就写这里吧) -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="showAlDialog"
      width="50%">

      <el-form :model="alGoodsRes" :rules="rules" ref="ruleFormRef" label-width="100px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="alGoodsRes.goods_name"/>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="alGoodsRes.goods_price"/>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="alGoodsRes.goods_number"/>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="alGoodsRes.goods_weight"/>
        </el-form-item>
        <el-form-item label="商品描述">
          <quill-editor class="elEditor" ref="myQuillEditor" v-model="alGoodsRes.goods_introduce" />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="upload-demo"
            :action="uploadURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_cat">
          <el-cascader
            v-model="alGoodsRes.goods_cat"
            :options="cateInfo"
            :props="cascaderProps"
            @change="handleChange"
            clearable/>
        </el-form-item>        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showAlDialog = !showAlDialog">取 消</el-button>
        <el-button type="primary" @click="alConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览图片的dialog -->
    <el-dialog
      :title="'图片预览'"
      :visible.sync="showProview"
      width="50%">
      <img :src="previewPath">
    </el-dialog>
  </div>
</template>

<script>
import { alGoods, getCategoryList } from 'network/Goods_list'

export default {
  name: 'TableContent',
  data() {
    return {
      alGoodsRes: {
        goods_cat: [],
      },
      // 上传图片零时路径
      pics: [],
      // 上传图片真是路径
      previewPath: '',
      showAlDialog: false,
      showProview: false,
      // 商品分类
      cateInfo: [],
      // 选中的分类
      currentCate: [],
      // 表单验证
      rules: {
        goods_name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请填写商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请填写商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请填写商品重量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      // 上传图片接口
      uploadURL: 'https://www.liulongbin.top:8888/api/private/v1/upload',
      headers: { Authorization: window.sessionStorage.getItem('token') },
      // casCader配置
      cascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      }
    }
  },
  props: {
    goodsList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 删除商品
    deletegoods(row) {
      this.$emit('deleteGoods', row)
    },
    // 修改商品
    alGoods(row) {
      this.$message('此功能暂未开发！')
      // this.alGoodsRes = row
      // this.showAlDialog = true
      // console.log(this.alGoodsRes)
    },
    // 点击确定修改
    alConfirm() {
      this.$refs.ruleFormRef.validate(valid => {
        if(valid) {
          const goods_cate = this.cateInfo.join(',')
          console.log(goods_cate)
          alGoods(this.alGoodsRes, this.pics, '483,505,518').then(res => {
            console.log(res)
          })
        }
      })
    },
    // 预览图片
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.showProview = !this.showProview
    },
    // 删除图片
    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      const i = this.pics.findIndex(item => {
        return item.pic === filePath
      })
      this.pics.splice(i, 1)
      console.log(this.pics)
    },
    // 图片上传成功时触发的钩子
    handleSuccess(res) {
      if(res.meta.status === 200) {
        const picInfo = { pic: res.data.tmp_path }
        this.pics.push(picInfo)
        this.$message.success('图片上传成功')
        console.log(this.pics)
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 请求cascader参数
    _getCategoryList() {
      getCategoryList().then(res => {
        if(res.meta.status === 200) {
          this.cateInfo = res.data
        } else {
          console.log(res.meta.msg)
        }
      })
    },
    // casCader操作改变时
    handleChange() {
      console.log(this.alGoodsRes.goods_cat)
    }
  },
  created() {
    this._getCategoryList()
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>