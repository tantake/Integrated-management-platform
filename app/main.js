// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from "./App.vue";


//import router from "./router";
//import store from "./store";
//import "amfe-flexible/index.js";
//import "normalize.css";
/* axios */
//import api from "@/api/index";
/* mint-ui */
//import Mint from "mint-ui";
//import "mint-ui/lib/style.css";
/* plugins */
//import iconFont from "./plugins/iconfont";
//import vueLocalForage from "./plugins/localforage";
/* utils */
//import "./util/authorization";



//Vue.use(api);
//Vue.use(Mint);
//Vue.use(iconFont);
//Vue.use(vueLocalForage);

//Vue.use(iView)
import GoodsView from "./views/GoodsView.vue";
import OrderView from './views/OrderView.vue';
import GoodsBrand from "./views/GoodsBrand.vue";
import GoodsCat from "./views/GoodsCat.vue";
import Index from "./views/Index.vue";
import Test from "./views/test.vue";
import VRouter from 'vue-router';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');
Vue.use(Antd)
Vue.use(VRouter)
let router = new VRouter({
    routes: [{
        path: '/1-1',
        component: Test,
    }, {
        path: '/2-1',
        component: OrderView,
    }, {
        path: '/1-2',
        component: GoodsCat,
    }, {
        path: '/1-3',
        component: GoodsBrand,
    },
, ]
})
console.log("798455");

Vue.config.productionTip = false;
//let a = 123
//console.log(a)
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});