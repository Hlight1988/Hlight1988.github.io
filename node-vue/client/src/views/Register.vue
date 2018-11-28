<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
            </div>
            <el-form :model="register" status-icon :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="password" v-model="register.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="password" v-model="register.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="register.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass2">
                    <el-input type="password" v-model="register.pass2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="register.identity" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
           const validatePass2 = (rule,value,callback) => {
               if(value !== this.register.pass2){
                   callback(new Error("两次输入密码不一致!"));
               } else {
                   callback();
               }
           }

            return {
                register: {
                    username: '',
                    email: '',
                    pass: '',
                    pass2: '',
                    identity: ''
                },
                rules: {
                    username: [
                        {trigger: 'blur' ,required:true,message:'用户名不能为空'},
                        {min:2, max:30, message:'长度在 2 到 30 个字符', trigger:'blur'}
                    ],
                    email: [
                        { type:'email', required:true, message:'邮箱格式不正确', trigger:'blur' }
                    ],
                    pass: [
                        { required:true, message:'密码不能为空',trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                    ],
                    pass2: [
                        { required:true, message:'确认密码不能为空',trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                        { validator: validatePass2, trigger: "blur" }
                    ],
                },
                options: [{
                    value: 'manager',
                    label: '管理员'
                }, {
                    value: 'employee',
                    label: '员工'
                }]
            };
        },
        methods: {
            submitForm:function(formName){

            }
        }
    }

</script>

<style scoped>
    .register{
        width: 100%;
        height: 100vh;
        background: url("../assets/bg.jpg") no-repeat;
        background-size: 100% 100%;
        position:relative;
    }
    .form_container{
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 50%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        transform: translateX(-50%);
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }
    .submit_btn {
        width: 100%;
    }
</style>
