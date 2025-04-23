<template>
    <div id="navigation">
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-header style="text-align: left; font-size: 12px;">
                <el-dropdown>
                    <span class="el-dropdown-link" style="cursor: pointer; display: inline-flex; align-items: center;">
                        <i class="el-icon-setting" style="margin-right: 5px;"></i> <!--el-icon-setting是设置图标-->
                        个人中心
                        <i class="el-icon-arrow-down el-icon--right" style="margin-left: 5px;"></i><!--el-icon-arrow-down是下拉箭头图标-->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>高硕1</el-dropdown-item>
                        <el-dropdown-item>高硕2</el-dropdown-item>
                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside style="background-color: rgb(238, 241, 246)" width="200px">
                    <el-menu router :default-openeds="['0','1']"><!--default-openeds是默认展开的菜单项,index要求为String类型-->
                        <el-submenu v-for="(item, index) in $router.options.routes" :key="index" :index="String(index)" v-if="item.show"><!--routes[ ]，是路由配置项，包含了所有的路由信息-->
                            <template slot="title"><i></i>{{ item.name }}</template>
<!--        二级标题          -->
                            <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path" :class="subItem.path==$route.path ? 'is-active' : ''"><!--index是菜单项的索引，绑定router跳转-->
                                {{ subItem.name }}
                            </el-menu-item>
<!--        三级标题          -->
<!--                            <el-submenu v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path">-->
<!--                                <template slot="title"><i></i>{{ subItem.name }}</template>-->
<!--                                <el-menu-item v-for="(childItem, childIndex) in subItem.children" :key="childIndex" :index="childItem.path" :class="childItem.path==$route.path ? 'is-active' : ''">-->
<!--                                    {{ childItem.name }}-->
<!--                                </el-menu-item>-->
<!--                            </el-submenu>-->
                        </el-submenu>
                    </el-menu>
                </el-aside><!--el-aside是侧边栏-->
                <el-main><!--el-main是页面的主体部分-->
                    <router-view/><!--router-view是路由的占位符，表示在这个位置渲染路由匹配到的组件-->
                </el-main>
            </el-container>
            <el-footer style="text-align: center; font-size: 12px">
                <i class="el-icon-message" style="margin-right: 15px">gaoshuo666@gmail.com</i>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "index"
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