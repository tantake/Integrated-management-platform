import Vue from "vue";
import Router from "vue-router";
import Index from "../views/Index.vue";
import IndoutinRecordListPEex from "../views/outingRecordManagement/outinRecordListPE.vue";
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "首页",
      component: Index,
    },
    {
      path: "/outingRecordManagement",
      name: "进出记录",
      component: Index,
      children:[
        {
          path: "/outingRecordManagement/outinRecordListPE",
          name: "进出记录",
          component: IndoutinRecordListPEex
        }
      ]
    },
    /* {
      path: "/common/pay/:orderID",
      name: "支付页面",
      component: () => import("@/view/common/Pay"),
      meta: {
        navShow: false
      }
    }, */
  ]
});
