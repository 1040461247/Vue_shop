<template>
  <div class="users">
    <!-- 面包屑导航区域 -->
    <breadcrumb></breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 添加和搜索区域 -->
      <el-row>
        <!-- 搜索与添加区域 -->
        <el-col :span="8" class="search">
          <div>
            <el-input
              placeholder="请输入查询姓名"
              v-model="usersParams.query"
              clearable
              @clear="_getUsers"
              @change="_getUsers"
            >
              <el-button slot="append" icon="el-icon-search" @click="_getUsers"></el-button>
            </el-input>
          </div>
        </el-col>
        <!-- 添加用户区域 -->
        <el-col :span="4">
          <el-button type="primary" @click="addUser()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="usersList" :border="true" :stripe="true">
        <el-table-column type="index" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column label="状态">
          <!-- table-column默认传递了一个当前整行数据对象的作用域插槽，可通过slot-scope接收 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeSwitch(scope.row, false)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="putUserInfo(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoles(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentPage"
        :current-page="usersParams.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="usersParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotal"
      ></el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="showDialog" width="50%" @close="closeDialog">
      <!-- 内容主体 -->
      <el-form :model="addUserInfo" :rules="rules" ref="addUserRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码 " prop="password">
          <el-input v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserInfo.mobile" @change="addUser(true)"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUser()">取 消</el-button>
        <el-button type="primary" @click="addUser(true)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="showPutDialog" width="50%" @close="closeDialog">
      <el-form :model="putUserData" :rules="rules" ref="putUserRef" label-width="100px">
        <el-form-item label="用户名">
          <el-input :disabled="true" :value="putUserData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="putUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="putUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="putUser()">取 消</el-button>
        <el-button type="primary" @click="putUser(true)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="showSetDialog" width="50%" ref="setDialogRef" @close="closeDialog">
      <el-form :model="setRowUserInfo" ref="setUserRef" label-width="100px">
        <div id="textInfo">
          <p>当前的用户： {{setRowUserInfo.username}}</p>
          <p>当前的角色： {{setRowUserInfo.role_name}}</p>
          <p>分配新角色：
            <el-select v-model="selectRoleId" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </p>
        </div>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectRoles(0)">取 消</el-button>
        <el-button type="primary" @click="selectRoles(1)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 组件导入
import Breadcrumb from "./childComps/Breadcrumb";
// 网络请求导入
import {
  getUsers,
  putState,
  postUsers,
  getUserInfo,
  putUserInfo,
  deleteUser,
  getRoles,
  setRights
} from "network/Home.js";

export default {
  name: "Users",
  components: {
    Breadcrumb
  },
  data() {
    // 表单验证器:回调函数内有三个形参
    // rule:当前所属于的验证规则对象
    // value:当前所验证的值
    // cb验证结果所调用的回调函数
    var validatorEmail = (rule, value, cb) => {
      const regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regular.test(value)) {
        return cb();
      } else {
        return cb(new Error("请输入正确邮箱地址"));
      }
    };
    var validatorMobile = (rule, value, cb) => {
      const regular = /^1[3456789]\d{9}$/;
      if (regular.test(value)) {
        cb();
      } else {
        cb(new Error("请输入正确手机号"));
      }
    };
    return {
      // 请求用户数据列表参数
      usersParams: {
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      // 用户数据列表
      usersList: [],
      usersTotal: 0,
      // 显示添加用户对话框
      showDialog: false,
      // 添加新用户数据
      addUserInfo: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 修改用户数据
      putUserData: {
        username: "",
        email: "",
        mobile: "",
        id: 0
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3~10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6~15个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          { validator: validatorEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatorMobile, trigger: "blur" }
        ]
      },
      showPutDialog: false,
      showDeleteDialog: false,
      showSetDialog: false,
      setRowUserInfo: {},
      rolesList: [],
      selectRoleId: null
    };
  },
  methods: {
    // 请求用户数据列表
    _getUsers() {
      getUsers(this.usersParams).then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("请求参数错误！");
        this.usersList = res.data.users;
        this.usersTotal = res.data.total;
      });
    },
    // 更改显示条数
    sizeChange(newSize) {
      this.usersParams.pagesize = newSize;
      this._getUsers();
    },
    // 更改页码
    currentPage(newPage) {
      this.usersParams.pagenum = newPage;
      this._getUsers();
    },
    // 保存Switch状态
    changeSwitch(msg) {
      console.log(msg);
      putState(Number(msg.id), msg.mg_state).then(res => {
        if (res.meta.status !== 200) {
          msg.mg_state = !msg.mg_state;
          return this.$message.error("更新用户状态失败！");
        } else {
          return this.$message.success("更新用户状态成功！");
        }
      });
    },
    // 添加用户
    addUser(msg = false) {
      // 判断点击按钮
      if (msg) {
        // 预校验
        this.$refs.addUserRef.validate((valid, obj) => {
          if (valid) {
            // 预校验成功,发送网络请求
            postUsers(this.addUserInfo).then(res => {
              if (res.meta.status !== 201) {
                this.$message.error(res.meta.msg);
                return console.log(res);
              } else {
                this.showDialog = !this.showDialog;
                this._getUsers();
                this.$message.success("添加用户成功!");
              }
            });
          } else {
            return this.$message.error("请输入正确表单信息!");
          }
        });
      } else {
        this.showDialog = !this.showDialog;
      }
    },
    // 修改用户信息并提交
    putUser(msg = false) {
      if (msg) {
        this.$refs.putUserRef.validate((valid, obj) => {
          if (valid) {
            putUserInfo(this.putUserData).then(res => {
              if (res.meta.status !== 200) {
                this.$message.error(res.meta.msg);
                return console.log(res);
              } else {
                this._getUsers();
                this.showPutDialog = !this.showPutDialog;
                this.$message.success("修改用户信息成功！");
              }
            });
          } else {
            return this.$message.error("请输入正确表单信息！");
          }
        });
      } else {
        this.showPutDialog = !this.showPutDialog;
      }
    },
    // 关闭添加用户对话框时重置文本信息
    closeDialog() {
      if (this.$refs.addUserRef) return this.$refs.addUserRef.resetFields();
      if (this.$refs.putUserRef) return this.$refs.putUserRef.resetFields();
      if (this.$refs.setDialogRef) {
        this.selectRoleId = '',
        this.setRowUserInfo = {}
      }
    },
    // 修改用户信息
    putUserInfo(msg) {
      getUserInfo(msg.id).then(res => {
        this.putUserData.id = res.data.id;
        this.putUserData.username = res.data.username;
        this.putUserData.email = res.data.email;
        this.putUserData.mobile = res.data.mobile;
      });
      this.showPutDialog = !this.showPutDialog;
    },
    // 根据id删除用户信息
    deleteUser(msg) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteUser(msg.id).then(res => {
          if(res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
            return console.log(res)
          }else {
            this.$message.success('删除成功！')
            this._getUsers()
          }
        })
      }).catch(() => console.log('取消了删除'))
    },
    // 分配角色
    setRoles(rowInfo) {
      // 在展示对话框之前获取所有角色列表
      getRoles().then(res => {
        if(res.meta.status === 200) {
          this.rolesList = res.data
        }else {
          return this.$message.error(res.meta.msg)
        }
      })
      // 展示对话框
      this.showSetDialog = !this.showSetDialog
      this.setRowUserInfo = rowInfo
    },
    // 确定分配的角色
    selectRoles(num) {
      if(num == 1) {
        if(!this.selectRoleId)
          return this.$message.error('请选择要分配的角色！')
        setRights(this.setRowUserInfo.id, this.selectRoleId).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('角色分配成功！')
            this.showSetDialog = !this.showSetDialog
            this._getUsers()
          }else {
            return this.$message.error(res.meta.msg)
          }
        })
      }else {
        return this.showSetDialog = !this.showSetDialog
      }
    }
  },
  created() {
    this._getUsers();
  }
};
</script>

<style scoped lang='less'>
.search {
  margin-right: 30px;
}
.el-row {
  padding-bottom: 20px;
}
.el-pagination {
  margin: 20px;
}
#textInfo {
  margin-left: 18px;
}
</style>