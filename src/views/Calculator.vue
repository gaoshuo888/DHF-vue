<template>
    <div class="calculator">
        <h2>简易计算器</h2>
        <input v-model.number="ruleForm.num1" placeholder="第一个数字" type="number" />
        <select v-model="ruleForm.operator">
            <option value="+">加</option>
            <option value="-">减</option>
            <option value="*">乘</option>
            <option value="/">除</option>
        </select>
        <input v-model.number="ruleForm.num2" placeholder="第二个数字" type="number" />
        <button @click="calculate">计算</button>
        <p v-if="result !== null">结果：{{ result }}</p>
    </div>
</template>

<script>
// import axios from 'axios'//在 plugins/axios.js 中写了 window.axios = axios,此处不需要再引入

export default {
    data() {
        return {
            ruleForm: {
                num1: 0,
                num2: 0,
                operator: '+'
            },
            result: null
        }
    },
    methods: {
        async calculate() {
            try {
                // axios.post('http://127.0.0.1:8082/book/add',this.ruleForm).then((resp)=>{//将 function 改成箭头函数 =>，箭头函数不会改变 this 的指向

                axios.post('http://127.0.0.1:8082/calculator/calculate', this.ruleForm).then((resp)=>{//resp是响应对象,即后端返回的数据
                    console.log(resp);
                    if (resp.status == 200) {
                        this.$message({
                            message: '计算成功！',
                            type: 'success'
                        });
                        this.result = resp.data.result;
                    } else {
                        alert('计算失败！');
                    }
                })
            } catch (error) {
                alert('计算出错：' + (error.response?.data?.message || error.message))
            }
        }
    }
}
</script>

<style scoped>
.calculator {
    padding: 20px;
    max-width: 400px;
    margin: auto;
}

input, select {
    margin: 5px;
}
</style>
