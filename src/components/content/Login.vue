<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!-- 头像区域 -->
        <img src="~@/assets/img/logo.png" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form class="form" :model="loginForm" :rules="rules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item class="formInput" prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username" placeholder="账户" @keyup.enter.native="clickLogin"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="formInput" prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            @keyup.enter.native="clickLogin"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="clickLogin">登录</el-button>
          <el-button type="info" @click="clickReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from "network/Login.js";

export default {
  name: "Login",
  data() {
    return {
      // 默认登陆账号
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则对象
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6-20个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 重置表单
    clickReset() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登陆表单
    clickLogin() {
      // 预校验表单内容
      this.$refs.loginFormRef.validate(valid => {
        // 当表单内容错误时，结束该方法
        if (!valid) return;
        // 当表单内容正确时，进行登陆验证
        Login(this.loginForm).then(res => {
          if (res.meta.status == 200) {
            console.log(res);
            this.$message({
              message: "登陆成功！",
              type: "success"
            });
            // 登陆后的每个请求都要携带token，所以把token存进sessionStorage的本地存储中
            window.sessionStorage.setItem("token", res.data.token);
            // 登陆后跳转路由页面
            this.$router.push("/home");
          } else {
            this.$message({
              message: "账号、密码有误！",
              type: "error"
            });
            console.log(res);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
