import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',//指定首页组件——默认首先看到的组件
        name: '图书管理',
        component: () => import(/* webpackChunkName: "home" */ '../views/Navigation.vue'),
        show: true,//是否显示在侧边栏
        children: [//指定子路由
            {
                path: '/bookSearch',
                name: '查询',
                component: () => import(/* webpackChunkName: "PageOne" */ '../views/BookSearch.vue')
            }
        ]
    },
    {
        path: '/navigation1',
        name: '数据图表',
        component: () => import(/* webpackChunkName: "navigation1" */ '../views/Navigation.vue'),
        show: true,//是否显示在侧边栏
        children: [
            {
                path: '/qChart',
                name: '折线图',
                component: () => import(/* webpackChunkName: "PageOne" */ '../views/Q_chart.vue'),
            },
            {
                path: '/qData',
                name: '数据表',
                component: () => import(/* webpackChunkName: "PageOne" */ '../views/QSearch.vue')
            }
        ]
    },
    {
        path: '/navigation2',
        name: '前后端交互',
        component: () => import(/* webpackChunkName: "navigation2" */ '../views/Navigation.vue'),
        show: true,//是否显示在侧边栏
        children: [
            {
                path: '/calculate',//指定首页组件——默认首先看到的组件
                name: '计算器',
                component: () => import(/* webpackChunkName: "PageOne" */ '../views/Calculator.vue')
            }
        ]
    },
    {
        path: '/navigation3',
        name: '不展示导航栏',
        show: false,//是否显示在侧边栏
        component: () => import(/* webpackChunkName: "PageFour" */ '../views/Navigation.vue'),
        children: [
            {
                path: '/addBook',
                name: '添加',
                component: () => import(/* webpackChunkName: "PageTwo" */ '../views/BookAdd.vue')
            },
            {
                path: '/bookUpdate',
                name: '修改',
                component: () => import(/* webpackChunkName: "PageFour" */ '../views/BookUpdate.vue')
            },
            {
                path: '/addQ',
                name: '添加数据',
                component: () => import(/* webpackChunkName: "PageFour" */ '../views/QAdd.vue')
            },
            {
                path: '/qUpdate',
                name: '数据表修改',
                component: () => import(/* webpackChunkName: "PageFour" */ '../views/QUpdate.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
