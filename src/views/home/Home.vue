<template>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="header-left">
          <img src="~assets/img/heima.png">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isFold ? '64px' : '200px'">
          <!-- 折叠按钮 -->
          <div class="toggle-buttom" @click="toggleCollapse">| | |</div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409bff"
            :unique-opened="true"
            :collapse="isFold"
            :collapse-transition="false"
            :router="true"
            :default-active="$route.path">
            <!-- 一级菜单 -->
            <el-submenu :index="String(item.id)" v-for="(item, index) in menuList" :key="item.id">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 一级菜单图标 -->
                <i :class="menuIcon[index]" class="el-icon-menu"></i>
                <!-- 一级菜单文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.authName}}</span>
                  </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 网络请求相关导入
import { getMenuInfo } from 'network/Home.js'

export default {
  name: "Home",
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 一级菜单icon
      menuIcon: ['iconfont icon-user', 'iconfont icon-tijikongjian', 'iconfont icon-shangpin', 'iconfont icon-danju', 'iconfont icon-baobiao'],
      // 是否折叠左侧菜单栏
      isFold: false,
    }
  },
  methods: {
    // 退出登录
    logout() {
      // 1、清空token值
      window.sessionStorage.clear();
      // 2、返回登陆界面
      this.$router.replace("/login");
    },
    // 请求左侧菜单栏数据
    _getMenuInfo() {
      getMenuInfo().then(res => {
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menuList = res.data
      })
    },
    // 折叠\展开左侧菜单栏
    toggleCollapse(){
      this.isFold = !this.isFold
    }
  },
  created(){
    this._getMenuInfo()
  }
};
</script>

<style scoped lang="less">
.el-header{
  background-color: #373d41;
  padding-left: 0;
  display: flex;
  justify-content:space-between; 
  align-items:center;
  color: #fff;
  font-size: 20px;
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;
}
.home-container{
  width: 100%;
  height: 100%;
}
.header-left {
  display: flex;
  align-items:center;
}
.header-left span{
  margin-left: 10px;
}
.el-icon-menu{
  padding-right: 5px;
}
.toggle-buttom{
  background-color: #4a5064;
  text-align: center;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  cursor: pointer;
}
</style>