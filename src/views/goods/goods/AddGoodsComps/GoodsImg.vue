<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :headers="headers"
      list-type="picture"
      :on-success="handleSuccess">
      <el-button size="small" type="primary">上传图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，大小任意</div>
    </el-upload>

    <!-- preview对话框 -->
    <el-dialog
      :title="'图片预览'"
      :visible.sync="isShow"
      width="50%">
      <img :src="previewPath">
    </el-dialog>
  </div>
</template>

<script>
import Dialog from 'components/common/Dialog'

export default {
  name: 'GoodsImg',
  components: {
    Dialog
  },
  data() {
    return {
      uploadURL: 'https://www.liulongbin.top:8888/api/private/v1/upload',
      headers: { Authorization: window.sessionStorage.getItem('token') },
      pics: [],
      previewPath: '',
      isShow: false
    }
  },
  methods: {
    // 处理图片预览效果
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.isShow = !this.isShow
    },
    // 处理移除图片操作
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
      } else {
        console.log(res)
      }
    },
  },
  activated(){
    this.$store.commit('pushValid', 4)
  },
  deactivated() {
    const valid = this.previewPath.length !== 0 ? true : false 
    const Obj = {
      res: valid,
      msg: valid ? '图片已上传' : '请上传商品图片'
    }
    this.$store.commit('searchValidMsg', Obj)
    if(this.pics.length !== 0) {
      this.$emit('imgFinish', this.pics)
    }
  }
}
</script>

<style>
img {
  width: 100%;
}
</style>