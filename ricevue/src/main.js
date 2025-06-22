import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";

//npm install cesium引入方法
// var Cesium = require('cesium/Cesium');
// var widgets= require('cesium/Widgets/widgets.css');
// import './css/base.css'
// 引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
//引入axios
import http from "axios";
import axios from "axios";
//引入mock
import "./api/mock.js";

import jquery from "jquery";

Vue.prototype.$ = jquery;

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$url = "http://localhost:8081/rice";

// 挂载高德地图
import MapLoader from "./Utils/Amap.js";
Vue.prototype.$map = MapLoader;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$http = http;



// vue-iclient3d-webgl组件库
// import '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css'
// import '@supermap/vue-iclient3d-webgl/dist/vue-iclient3d-webgl.min.js'
import VueiClient from '@supermap/vue-iclient3d-webgl'
Vue.config.productionTip = false
Vue.use(VueiClient)
// Vue.use(webgl3d)





//路由守卫
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({
      name: "login",
    });
  } else if (token && to.name === "login") {
    next({
      name: "user",
    });
  } else {
    next();
  }
});

new Vue({
  render: (h) => h(App),
  // 注册路由
  router,
  //注册仓库
  store,
  //动态添加路由
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
