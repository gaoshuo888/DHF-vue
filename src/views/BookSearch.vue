<template>
    <div>
        <h1>This is a page one</h1>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-button type="primary" size="small" @click="addBook">添加</el-button>
<!--                <el-button type="primary" size="small" @click="$router.push({path: '/addBook'})">添加</el-button>-->
            </el-header>

            <el-main>
                <el-table :data="tableData.flat()"><!--el-table是表格组件，:data是表格的数据源-->
                    <el-table-column label="id" prop="id" width="140">
                        <!--el-table-column是表格的列组件，prop是数据源中的字段名，label是列的标题，width是列的宽度-->
                    </el-table-column>
                    <el-table-column label="图名" prop="name" width="120">
                    </el-table-column>
                    <el-table-column label="作者" prop="author">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="editBook(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <div class="block">
            <el-pagination
                    :page-size="pageSize"
                    :pager-count="5"
                    :total="total"
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange">
                <!--page-size,每页显示的数据条数--><!--pager-coun,控制页码按钮的数量，根据总数和每页数自动计算得出-->
                <!--layout,分页组件的布局，表示只显示“上一页、页码、下一页”三个部分--><!--total,总数据条数-->
            </el-pagination><!--el-pagination是分页组件-->
        </div>
    </div>
</template>

<script>
export default {
    name: "PageOne",
    data() {
        const item = [
            {id: '1', name: '西游记', author: '吴承恩'},
            {id: '2', name: '红楼梦', author: '曹雪芹'},
            {id: '3', name: '三国演义', author: '罗贯中'}
        ];
        return {
            total: null,
            pageSize: null,
            totalPages: null,
            tableData: Array(1).fill(item)
        }
    },
    methods: {
        handleCurrentChange(val) {
            const _this = this;//保存this的引用,解决this的指向问题，直接使用this是局部变量
            axios.get('http://127.0.0.1:8082/book/list/' + val).then(function (resp) {
                _this.tableData = resp.data.content;
                //     // alert(`当前页: ${val}`);
            })
        },
        addBook(){
            this.$router.push('/addBook');//跳转到AddBook.vue
        },
        editBook(row) {//编辑按钮的点击事件
            // console.log(row);
            this.$router.push({path: '/bookUpdate', query: {id: row.id, name: row.name, author: row.author}});
            //跳转到编辑页面，并传递参数
        },
        deleteBook(row) {
            alert(`确定删除id为${row.id}的数据吗？`);
            axios.delete(`http://127.0.0.1:8082/book/delete/${row.id}`)//使用 ES6 模板字符串的写法（注意反引号 ``），可以在字符串中嵌入变量
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$message({
                            message: '数据删除成功！',
                            type: 'success'
                        });
                        this.tableData = this.tableData.filter(item => item.id !== row.id);
                    } else {
                        this.$message.error('数据删除失败！');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.$message.error('请求出错，请稍后再试！');
                });
        }

    },
    created() {//created函数，在组件实例被创建后立即调用
        const _this = this;//保存this的引用,解决this的指向问题，直接使用this是局部变量
        axios.get('http://127.0.0.1:8082/book/list/1').then(function (resp) {
            _this.tableData = resp.data.content;
            // console.log(resp)
            _this.total = resp.data.totalElements;
            _this.pageSize = resp.data.pageable.pageSize;
            _this.totalPages = resp.data.totalPages;
        })
    }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

</style>