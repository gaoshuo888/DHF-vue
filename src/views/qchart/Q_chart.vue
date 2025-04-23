<template>
    <div>
        <div ref="chartContainer" :style="{ width: '800px', height: '600px' }"></div>
    </div>
</template>

<script>
export default {
    name: 'Echarts',
    data() {
        return {
            myChart: null,
            book: [] // 初始化为空数组，确保数据类型正确
        };
    },
    mounted() {
        if (this.$refs.chartContainer) {
            this.myChart = this.$echarts.init(this.$refs.chartContainer);
            window.addEventListener('resize', this.resizeChart);
            this.fetchData(); // 这里调用fetchData方法加载数据
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeChart);
        if (this.myChart) {
            this.myChart.dispose();
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8082/chart/list').then((resp) => {
                this.book = resp.data; // 获取数据并更新book
                // console.log(resp.data);
                this.setChartOptions(); // 数据加载后再调用设置图表的函数
                //axios.get()是异步的,执行axios.get()加载数据时，程序不会等待数据加载完成就执行下面的代码
                // this.setChartOptions()需要在数据加载完成后再执行
            }).catch(error => {
                console.error('请求数据失败:', error);
            });
        },
        setChartOptions() {
            // 检查book数据是否已加载
            if (!this.book.length) {
                console.error('没有数据来绘制图表');
                return;
            }

            const xData = this.book.map(item => item.xData);
            const yData = this.book.map(item => item.yData);

            this.myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: yData,
                        type: 'line',
                        smooth: true
                    }
                ]
            });
        },
        resizeChart() {
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    },
    created() {
        // 可以保持为空，数据获取已经在mounted中执行了
    }
};
</script>
