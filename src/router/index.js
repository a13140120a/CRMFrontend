import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import store from '@/store/index';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: true }
  },
  {
    path: '/',  
    name: 'Home',
    // component: Login,
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
    var verify = true;

    console.log("route to: ", to.fullPath);

    // 判斷是否需要 verify
    if (to.meta.requiresAuth){
        verify = await store.dispatch('member/isLogin')
    }
    // 需要 verify 的非 login 畫面未 verify
    if (!verify && to.name!=="Login"){
        return { name: 'Login' };
    } 
    // login 畫面已 verify 
    if (verify && to.name==="Login") {
        return { name: 'Home' };
    }
})

export default router
