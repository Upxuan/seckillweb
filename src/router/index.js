import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Products from '@/components/system/Products'
import ProductDetail from '@/components/system/ProductDetail'
import Seckill from '@/components/system/Seckill'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/productlist',
            name: 'Products',
            component: Products,
            meta: {
                title: '秒杀商品列表'
            }
        },
        {
            path: '/productdetail',
            name: 'ProductDetail',
            component: ProductDetail,
            meta: {
                title: '秒杀商品详情'
            }
        },
        {
            path: '/seckill',
            name: 'Seckill',
            component: Seckill
        }
    ]
})
