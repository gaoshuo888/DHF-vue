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
                <div class="icon-title-container">
                    <i class="el-icon-setting"></i>
                    <h1>DHF模型参数设置</h1>
                </div>
                <el-row align="middle" justify="center" type="flex">
                    <el-button type="primary" @click="goToFlowParams">产流</el-button>
                    <el-button type="success" @click="goToConfluenceParams">汇流</el-button>
                    <el-button type="warning" @click="goToEvaporationParams">蒸发</el-button>
                    <el-button type="info" @click="goToBasinParams">流域</el-button>
                    <el-button type="danger" @click="programRunning">运行</el-button>
                </el-row>
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        goToFlowParams() {
            if (this.$route.path !== '/runoff-params') {//判断当前路由是否为'/parametersE'，因为如果是，就不需要跳转了
                this.$router.push('/runoff-params');
            }
        },
        goToConfluenceParams() {
            if (this.$route.path !== '/confluence-params') {
                this.$router.push('/confluence-params');
            }
        },
        goToEvaporationParams() {
            if (this.$route.path !== '/evaporation-params') {
                this.$router.push('/evaporation-params');
            }
        },
        goToBasinParams() {
            if (this.$route.path !== '/basin-params') {
                this.$router.push('/basin-params');
            }
        },
        programRunning(){
            if (this.$route.path !== '/program-running') {
                this.$router.push('/program-running');
            }
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
    width: 150px;
    margin: 0 auto;
}
</style>
