<template>
    <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px"><!--model是表单数据对象，rules是表单验证规则-->
            <el-form-item label="日期：" prop="xData"><!--prop是表单项对应的数据对象的属性名,可用于编写对应规则-->
                <el-input v-model="ruleForm.xData"></el-input><!--v-model是双向绑定的指令，表示将表单项的值与数据对象的属性进行绑定-->
            </el-form-item>
<!--            <el-form-item label="销量：" prop="yData">-->
<!--                <el-input v-model="ruleForm.yData"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="销量：" prop="yData">
                <el-input v-model.number="ruleForm.yData" type="number" placeholder="请输入销量" />
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
                xData: '',// 初始为空字符串，后续可以输入日期
                yData: null,//初始化为0.0，确保数据类型正确    ！！！数据类型！！！
            },
            rules: {//表单验证的规则配置
                xData: [
                    {required: true, message: '请输入日期', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ],
                yData: [//数据类型Float
                    { required: true, message: '请输入销量', trigger: 'blur' },
                    { type: 'number', message: '请输入有效的数字', trigger: 'blur' } // 确保是数字
                    // { min: 1, max: 1000, message: '销量应在 1 到 10000 之间', trigger: 'blur' } // 设定销量范围
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
                    console.log(this.ruleForm);
                    // axios.post('http://127.0.0.1:8082/book/add',this.ruleForm).then(function (resp){//用function，导致 this 的上下文指向发生了变化
                    axios.post('http://127.0.0.1:8082/chart/addQ',this.ruleForm).then((resp)=>{//将 function 改成箭头函数 =>，箭头函数不会改变 this 的指向
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