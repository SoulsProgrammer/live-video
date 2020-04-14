import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { index: -1 },
		component: Home,
		redirect:'/ProductsSelected',
		children: [
			{
				path: '/follow',
				name: 'Follow',
				meta: { index: -1},
				component: () => import(/* webpackChunkName: "about" */ '../views/Follow.vue')
			},
			{
				path: '/ProductsSelected',
				name: 'ProductsSelected',
				meta: { index: 0 },
				component: () => import(/* webpackChunkName: "about" */ '../views/ProductsSelected.vue')
			},
			{
				path: '/my',
				name: 'My',
				meta: {
					index: 1
				},
				component: () => import('../views/My.vue')
			},
		]
	},
	{
		path: '/more',
		name: 'More',
		meta: { index: 2 },
		component: () => import(/* webpackChunkName: "about" */ '../views/More.vue')
	},
	{
		path: '/shop',
		name: 'Shop',
		meta: { index: 3 },
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Shop.vue')
	},
	{
		path: '/shopiframe',
		name: 'shopiframe',
		meta: { index: 1 },
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/ShopIframe.vue')
	},
	{
		path: '/followDetail',
		name: 'FollowDetail',
		meta: { index: 3 },
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/FollowDetail.vue')
	},
	{
		path: '/address',
		name: 'Address',
		meta: {
			index: 3
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Address.vue')
	},
	{
		path: '/cart',
		name: 'Cart',
		meta: {
			index: 3
		},
		component: () => import('@/views/cart'),
	},
	{
		path: '/collection',
		name: 'collection',
		meta: {
			index: 2
		},
		component: () => import('@/views/collection'),
	},
	{
		path: '/order',
		name: 'Order',
		meta: {
			index: 3
		},
		component: () => import('@/views/order'),


		beforeRouteLeave (to, from, next) {
			this.loading = true
			if (to.path === '/goods_detail') {
			  from.meta.keepAlive = true
			} else {
			  from.meta.keepAlive = false
			 // this.$destroy()
			}
			next()
		  },
	},
	{
		path: '/orderDetail',
		name: 'OrderDetail',
		meta: {
			index: 4
		},
		component: () => import('@/views/orderDetail'),
	},
	{
		path: '/express/:oderId',
		name: 'Express',
		meta: {
			index: 4
		},
		props:true,
		component: () => import('@/views/Express'),
	},
	{
		path: '/addDetailEdit',
		name: 'AddDetailEdit',
		meta: {
			index: 4
		},
		component: () => import('@/views/AddDetailEdit'),
	},

	{
		path: '/addDetailAdd',
		name: 'AddDetailAdd',
		meta: {
			index: 4
		},
		component: () => import('@/views/AddDetailAdd'),
	},

	{
		path: '/orderSub',
		name: 'OrderSub',
		meta: {
			index: 3
		},
		component: () => import('@/views/orderSub'),
	},
	{
		path: '/return',
		name: 'Return',
		meta: {
			index: 3
		},
		component: () => import('@/views/return'),
	},
	{
		path: '/returnApply',
		name: 'ReturnApply',
		meta: {
			index: 4
		},
		component: () => import('@/views/ReturnApply'),
	},{
		path: '/returnDetail',
		name: 'ReturnDetail',
		meta: {
			index: 4
		},
		component: () => import('@/views/ReturnDetail'),
	},{
		path: '/redPack',
		name: 'RedPack',
		meta: {
			index: 3
		},
		component: () => import('@/views/RedPack')
	},	
	{
		path: '/chat/:kefuId/:kefuName/:myUserId/:myUserName',
		name: 'chat',
		meta: {
			index: 4
		},
		props:true,
		component: () => import('@/views/chat')
	},
	{
		path: '/checkPayment/:orderSn',
		name: 'checkPayment',
		meta: {
			index: 4
		},
		props:true,
		component: () => import('@/views/finishPayment')
	},
	
]

const router = new VueRouter({
  routes,
  
})

export default router
