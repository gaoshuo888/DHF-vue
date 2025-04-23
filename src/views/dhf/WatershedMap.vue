<template>
    <div class="home">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <!-- 使用 Flexbox 容器 ,图表和标题可以在同一行  -->
                    <div class="icon-title-container">
                        <i class="el-icon-map-location"></i>
                        <h1>英那河流域图</h1>
                    </div>
                    <p>
                        英那河流域地处大连市东北部山区，是大连市重要的水源地，不仅为城市提供用水，还承担着保护丹大高速公路和201国道丹普大桥沿线乡镇及低珪处居民的生命财产安全，以及保护部分工厂和企业的防洪任务。</p>
                    <img alt="英那河流域图" class="watershed-image" src="../../assets/WatershedMap.jpg">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <h1 class="is-center">DHF模型参数</h1>
                    <div>
                        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm"
                                 label-width="100px">
                            <el-form-item label="E1：" prop="E1"><!--prop是表单项对应的数据对象的属性名,可用于编写对应规则-->
                                <el-input v-model="ruleForm.E1" class="input-width"></el-input>
<!--                                v-model 双向绑定了表单数据对象 ruleForm 中的 E1 字段。每次用户输入时，ruleForm.E1 会自动更新-->
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
                E1: '', // 初始为空字符串，后续可以输入日期
                E2: null, // 初始化为0.0，确保数据类型正确
            },
            rules: { // 表单验证的规则配置
                E1: [
                    { required: true, message: '请输入日期', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                E2: [ // 数据类型Float
                    { required: true, message: '请输入销量', trigger: 'blur' },
                    { type: 'number', message: '请输入有效的数字', trigger: 'blur' } // 确保是数字
                ]
            }
        };
    },
    methods: {},
};
</script>

<style scoped>

/*设置图片格式*/
img.watershed-image {
    width: 100%;
    height: auto;
    max-width: 1000px; /* 设置最大宽度，防止图片被拉伸 */
    display: block;
    margin: 0 auto;
}

/* Flexbox 布局 */
.icon-title-container {
    display: flex;
    align-items: center; /* 垂直居中对齐图标和文本 */
    justify-content: center; /* 水平居中 */
}

.icon-title-container i {
    font-size: 24px; /* 设置图标大小 */
    margin-right: 10px; /* 图标和标题之间的间距 */
}

h1.is-center {
    font-size: 20px;
    color: #333;
    margin: 0; /* 去掉默认的 margin */
    text-align: center; /* 水平居中 */
}
/* 设置表单输入框的宽度 */
.input-width {
    width: 120px; /* 设置输入框的宽度 */
    margin: 0 auto; /* 水平居中 */
}
</style>
