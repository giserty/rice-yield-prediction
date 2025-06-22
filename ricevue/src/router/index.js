//配置路由
import VueRouter from "vue-router";
import Vue from "vue";

//使用路由插件
Vue.use(VueRouter);

//引入路由组件
import Mains from "@/pages/Mains"; 

// 配置路由
export default new VueRouter({
  routes: [
    {
      path: "/mains",
      name: 'Mains',
      component: Mains,
      // redirect: '/user',
      //子路由嵌套
      children: [],
    },
    { 
      path:'/login', 
      name:'login', 
      component:()=>import('../pages/Login/index.vue')
    },
    {
      path:'/home',
      name:'home',
      component:()=>import('../pages/Home/index.vue')
    },
    {
      path:'/forecast',
      name:'forecast',
      component:()=>import('../pages/Forecast/index.vue')
    },
    {
      path:'/statistics',
      name:'statistics',
      component:()=>import('../pages/Statistics/index.vue')
    },
    {
      //重定向，初始界面
      path: "*",
      redirect: "/login",
    },
  ],
});
