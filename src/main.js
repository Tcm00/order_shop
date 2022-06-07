//引入vue
import Vue from "vue";
//引入APP组件
import App from "./App.vue";
//引入路由插件
import router from "./router";
//引用vuex插件
import store from "./store";
//引入vantUI
import Vant from "vant";
import "vant/lib/index.css";
//使用vantUI插件
Vue.use(Vant);
//引入axios
import service from "@/api/index.js";
Vue.prototype.$http = service;
//关闭vue生产提示
Vue.config.productionTip = false;

//创建vue实例
new Vue({
    //创建模板
    render: (h) => h(App),
    //挂载路由实例
    router,
    store,
    beforeCreate() {
        //全局事件总线
        Vue.prototype.$bus = this;
    },
}).$mount("#app");
