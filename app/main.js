// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vue from 'vue/dist/vue.esm.js'
import App from "./App.vue";
import router from "./router/index";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');
// import Icon from 'vue-svg-icon/Icon'
// Vue.component("icon",Icon)
Vue.use(Antd);

Vue.config.productionTip = false;
new Vue({
    // el: "#app",
    router,
    render:h=>h(App)
}).$mount('#app')