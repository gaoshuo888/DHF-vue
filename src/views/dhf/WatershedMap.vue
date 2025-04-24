<template>
    <div class="home">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="icon-title-container">
                        <i class="el-icon-map-location"></i>
                        <h1>英那河流域图</h1>
                    </div>
                    <p>
                        英那河流域地处大连市东北部山区，是大连市重要的水源地，不仅为城市提供用水，还承担着保护丹大高速公路和201国道丹普大桥沿线乡镇及低珪处居民的生命财产安全，以及保护部分工厂和企业的防洪任务。
                    </p>
                    <img alt="英那河流域图" class="watershed-image" src="../../assets/WatershedMap.jpg">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <h1 class="is-center">DHF模型参数</h1>
                    <div>
                        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
                            <el-form-item label="E1：" prop="E1">
                                <el-input v-model="ruleForm.E1" class="input-width"></el-input> <!-- 移除 .number -->
                            </el-form-item>
                            <el-form-item label="E2：" prop="E2">
                                <el-input v-model="ruleForm.E2" class="input-width"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                                <el-button type="warning" @click="test()">测试</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "WatershedMap",
    data() {
        return {
            ruleForm: {
                E1: null,
                E2: null,
            },
            rules: {
                E1: [
                    { required: true, message: '请输入 E1', trigger: 'blur' },
                    {
                        message: '请输入有效的数字，范围为 1~10，小数点后最多两位',
                        trigger: 'blur',
                        pattern: /^([1-9](\.\d{1,2})?|10(\.0{1,2})?)$/ // 修正后的正则表达式
                    },
                    { min: 1, max: 10, message: '范围为 1~10', trigger: 'blur' }
                ],
                E2: [
                    { required: true, message: '请输入 E2', trigger: 'blur' },
                    {
                        message: '请输入有效的数字，范围为 1~10，小数点后最多两位',
                        trigger: 'blur',
                        pattern: /^([1-9](\.\d{1,2})?|10(\.0{1,2})?)$/ // 修正后的正则表达式
                    },
                    { min: 1, max: 10, message: '范围为 1~10', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        test() {
            console.log(this.ruleForm);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
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
    width: 120px;
    margin: 0 auto;
}
</style>
