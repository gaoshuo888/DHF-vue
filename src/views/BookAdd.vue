<template>
    <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px"><!--model是表单数据对象，rules是表单验证规则-->
            <el-form-item label="书名：" prop="name"><!--prop是表单项对应的数据对象的属性名,可用于编写对应规则-->
                <el-input v-model="ruleForm.name"></el-input><!--v-model是双向绑定的指令，表示将表单项的值与数据对象的属性进行绑定-->
            </el-form-item>
            <el-form-item label="作者：" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="warning" @click="test()">测试</el-button><!--@click是点击事件的绑定，表示点击按钮时执行test方法,console.log()测试数据-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                author: '',
            },
            rules: {
                name: [
                    {required: true, message: '请输入图书名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '请输入作者名字', trigger: 'blur'},
                    {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        test() {
            console.log(this.ruleForm);
        },

        submitForm(formName) {
            // const _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // axios.post('http://127.0.0.1:8082/book/add',this.ruleForm).then(function (resp){//用function，导致 this 的上下文指向发生了变化
                    axios.post('http://127.0.0.1:8082/book/add',this.ruleForm).then((resp)=>{//将 function 改成箭头函数 =>，箭头函数不会改变 this 的指向
                        // console.log(resp);
                        if (resp.status == 200) {
                            this.$message({
                                message: '数据提交成功！',
                                type: 'success'
                            });
                            this.$router.push({path: '/bookSearch'});
                        } else {
                            alert('数据提交失败！');
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>