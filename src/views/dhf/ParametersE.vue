<template>
  <!-- 此页面为蒸发参数，和产流参数以及汇流参数一起作为子页面  -->
    <div>
        <el-table :data="tableData" style="width: 100%" :align="'center'">
            <!--  ：data是表格的数据源  -->
            <el-table-column label="参数名" prop="name" width=120 align="center"/>
            <!--el-table-column是表格的列组件，prop是数据源中的字段名，label是列的标题，width是列的宽度-->
            <el-table-column label="参数值" width=200 align="center">
                <template #default="scope">
                    <el-input-number
                            v-model="scope.row.value"
                            :max="10"
                            :min="0"
                            :step="0.1"
                            controls-position="right"
                    />
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 20px; text-align: center;">
            <el-button type="primary" @click="submitData">提交</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 表格数据
            tableData: [],
            originalData: []
        };
    },
    methods: {
        submitData() {
            console.log('提交数据:', this.tableData);
            axios.post('http://127.0.0.1:8082/parametersE/update', this.tableData)
                .then((resp) => {
                    if (resp.status == 200) {
                        alert('提交成功！');
                    } else {
                        alert('提交失败！');
                    }
                })
                .catch(error => {
                    console.error('请求数据失败:', error);
                });
        },
        resetData() {
            this.tableData = JSON.parse(JSON.stringify(this.originalData));
        }
    },
    created() {
        // 根据数据库初始化参数
        axios.get('http://127.0.0.1:8082/parametersE/list')
            .then((resp) => {
                this.tableData = resp.data;
                this.originalData = JSON.parse(JSON.stringify(resp.data));  //在这里保存初始数据
            })
            .catch(error => {
                console.error('请求数据失败:', error);
            });
    },

};
</script>

<style scoped>
.is-center {
    text-align: center;
}
</style>
