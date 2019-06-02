<template>
  <div id="login">
    <div class="content">
        <el-card shadow="always" style="margin-top:40%;">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" style="margin-top:10%;">
                <h1 class="title">SECKILL</h1>
                <el-form-item prop="username">
                <el-input
                    type="username"
                    v-model="ruleForm2.username"
                    :maxlength='16'
                    auto-complete="off"
                    placeholder="username"
                    @keyup.enter.native='handleSubmit'
                    clearable>
                </el-input>
                </el-form-item>
                <el-form-item prop="password">
                <el-input
                    type="password"
                    v-model="ruleForm2.password"
                    :maxlength='16'
                    auto-complete="off"
                    placeholder="password"
                    @keyup.enter.native='handleSubmit'
                    show-password>
                </el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                <!-- <el-button type="primary" style="width:45%;" @click="resetForm"> Reset </el-button>
                <el-button type="primary" style="width:45%;margin-left:27px;" @click.native.prevent="handleSubmit"> Login </el-button> -->
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <el-button 
                            type="info" 
                            style="width:100%;" 
                            @click="resetForm"> 
                            Reset 
                            </el-button>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-5 ">
                            <el-button 
                            type="danger" 
                            style="width:100%;" 
                            @click.native.prevent="handleSubmit" 
                            :loading="logining"> 
                            Login 
                            </el-button>
                        </div>
                    </div>
                </div>
                </el-form-item>
            </el-form> 
        </el-card>
    </div>
  </div>
</template>

<script>
import {getCookie,delCookie,setCookie} from '@/js/Cookie.js'
export default {
  name: 'login',
  data () {
    var validateAccount = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入用户名'));
        }else {
            var targ = /^[A-Za-z0-9]+$/;
            if(!targ.test(value)){
                callback(new Error('用户名只支持英文、数字'));
            }
            callback();
        }
    }
    return {
        logining: false,
        ruleForm2: {
            username: '', //用户名
            password: '' //密码
        },
        rules2: {
            username: [
                { validator: validateAccount, trigger: 'blur' },
                { min: 11, max: 11, required: true, message: '请输入11位的账号', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 16, required: true, message: '密码长度于6-16位之间', trigger: 'blur' },
            ]
        }
    }
  },
  methods: {
    resetForm() {
        this.$refs.ruleForm2.resetFields();
    },
    handleSubmit() {
        var _this = this;
        var salt="1a2b3c4d"
        this.$refs.ruleForm2.validate((valid) => {
            if (valid) {
                _this.logining = true;
                var Params = {
                    mobile: this.ruleForm2.username,
                    password: this.$md5(""+salt.charAt(0)+salt.charAt(2) + this.ruleForm2.password +salt.charAt(5) + salt.charAt(4))
                }

                $.ajax({
                    url: "/api/login/login",
                    type: "POST",
                    data: Params,
                    success(data) {
                        // console.log(data)
                        _this.logining = false;
                        if(data.code == 0){
                            var user = JSON.stringify(Params);
                            setCookie('userInfo', user);
                            _this.$router.push({ path:'/productlist' });
                        }else if(data.code == 500214){
                            _this.$message.error("手机号不存在");
                        }else if(data.code == 500215){
                            _this.$message.error("密码错误");
                        }else if(data.code == 500100){
                            _this.$message.error("服务端异常");
                        }else if(data.code == 500101){
                            _this.$message.error("参数校验异常");
                        }else if(data.code == 500102){
                            _this.$message.error("请求非法");
                        }else if(data.code == 500104){
                            _this.$message.error("访问太频繁");
                        }
                    },
                    error() {
                        _this.logining = false;
                        // this.$notify.error({ title: 'ERROR', message: '出错！请联系管理员' });
                    }
                });
            }else {
                _this.logining = false;
                this.$notify.error({ title: 'ERROR', message: '出错！请联系管理员' });
                return false;
            }
        });
    }
  }
}
</script>

<style scoped>
#login {
  /* font: 16px/20px microsft yahei; */
  width: 100%;
  height: 100%;
  padding: 40px 0;
  position: fixed;
  background: url('../../static/images/background.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  color: #FFFFFF;
}
.content {
  width: 20%;
  min-width: 350px;
  margin: 50px auto;
}
.content h1 {
    text-align: center;
    color: #F56C6C;
    font-weight: 500;
    margin-bottom: 30px;
}

[class^=col-] {
    padding: 0px;
}
</style>
