<template>
    <div class="home">
        <el-row>
            <el-col :span="12">
                <div class="icon-title-container">
                    <i class="el-icon-map-location"></i>
                    <h1>英那河流域图</h1>
                </div>
                <p>
                    英那河流域地处大连市东北部山区，是大连市重要的水源地，不仅为城市提供用水，还承担着保护丹大高速公路和201国道丹普大桥沿线乡镇及低珪处居民的生命财产安全，以及保护部分工厂和企业的防洪任务。
                </p>
                <img alt="英那河流域图" class="watershed-image" src="../../assets/WatershedMap.jpg">
            </el-col>
            <el-col :span="12">
                <h1 class="is-center">DHF模型参数</h1>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
                    <!--                    <el-form-item label="ID：" prop="id">-->
                    <!--                        <el-input-number v-model="ruleForm.id" controls-position="right"></el-input-number>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="E1：" prop="E1">
                        <el-input-number v-model="ruleForm.E1" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="E2：" prop="E2">
                        <el-input-number v-model="ruleForm.E2" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="info" @click="calculator('ruleForm')">计算</el-button>
                        <el-button type="warning" @click="test()">测试</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                id: '',
                E1: null,
                E2: null,
            },
            originalForm: {}, // 用于保存从数据库来的初始值
            rules: {
                E1: [
                    {required: true, message: '请输入 E1', trigger: 'blur'},
                    {type: 'number', min: 1, max: 10, message: '请输入有效的数字，范围为 1~10', trigger: 'blur'}
                ],
                E2: [
                    {required: true, message: '请输入 E2', trigger: 'blur'},
                    {type: 'number', min: 1, max: 10, message: '请输入有效的数字，范围为 1~10', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        calculator(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('http://127.0.0.1:8082/parameter/calculate', this.ruleForm).then((resp) => {
                        console.log(resp);
                        if (resp.status == 200) {
                            alert('计算成功！');
                        } else {
                            alert('计算失败！');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        test() {
            console.log(this.ruleForm);
        },
        resetForm(formName) {
            // 手动重置为初始值
            this.ruleForm = JSON.parse(JSON.stringify(this.originalForm));
            // 需要通知 Element UI 表单重新校验状态
            this.$nextTick(() => {
                this.$refs[formName].clearValidate();
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm);
                    // axios.post('http://127.0.0.1:8082/book/add',this.ruleForm).then(function (resp){//用function，导致 this 的上下文指向发生了变化
                    axios.post('http://127.0.0.1:8082/parameter/add', this.ruleForm).then((resp) => {//将 function 改成箭头函数 =>，箭头函数不会改变 this 的指向
                        if (resp.status == 200) {
                            this.$message({
                                message: '数据提交成功！',
                                type: 'success'
                            });
                            // this.$router.push({path: '/dhfMap'});不能跳转到当前路由dhfMap.vue
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
        }
    },
    created() {
        axios.get('http://127.0.0.1:8082/parameter/list').then((resp) => {
            if (resp.status === 200) {
                const data = {
                    id: resp.data[0].id,
                    E1: resp.data[0].E1,
                    E2: resp.data[0].E2
                };
                this.ruleForm = JSON.parse(JSON.stringify(data));     // 绑定表单
                this.originalForm = JSON.parse(JSON.stringify(data));  // 保存初始值
            } else {
                alert('数据获取失败！');
            }
        }).catch((error) => {
            alert('数据获取出错：' + (error.response?.data?.message || error.message));
        });
    }
};

</script>

<style scoped>
img.watershed-image {
    width: 100%;
    height: auto;
    max-width: 1000px;
    display: block;
    margin: 0 auto;
}

.icon-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-title-container i {
    font-size: 24px;
    margin-right: 10px;
}

h1.is-center {
    font-size: 20px;
    color: #333;
    margin: 0;
    text-align: center;
}

.input-width {
    width: 150px;
    margin: 0 auto;
}
</style>
