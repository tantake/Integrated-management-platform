<template>
  <!--  <List :data_header="order_header" :data_list='order_List'></List>-->
  <div>
    <div class="x-nav">
      <span class="layui-breadcrumb">
        <a href>首页</a>
        <a href>演示</a>
        <a>
          <cite>导航元素</cite>
        </a>
      </span>
      <a
        class="layui-btn layui-btn-small"
        style="line-height:1.6em;margin-top:3px;float:right"
        onclick="location.reload()"
        title="刷新"
      >
        <i class="layui-icon layui-icon-refresh" style="line-height:30px"></i>
      </a>
    </div>
    <div class="layui-fluid">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-body">
              <form class="layui-form layui-col-space5">
                <div class="layui-input-inline layui-show-xs-block">
                  <input class="layui-input" placeholder="开始日" name="start" id="start" />
                </div>
                <div class="layui-input-inline layui-show-xs-block">
                  <input class="layui-input" placeholder="截止日" name="end" id="end" />
                </div>
                <div class="layui-input-inline layui-show-xs-block">
                  <select name="contrller">
                    <option>支付方式</option>
                    <option>支付宝</option>
                    <option>微信</option>
                    <option>货到付款</option>
                  </select>
                </div>
                <div class="layui-input-inline layui-show-xs-block">
                  <select name="contrller">
                    <option value>订单状态</option>
                    <option value="0">待确认</option>
                    <option value="1">已确认</option>
                    <option value="2">已收货</option>
                    <option value="3">已取消</option>
                    <option value="4">已完成</option>
                    <option value="5">已作废</option>
                  </select>
                </div>
                <div class="layui-input-inline layui-show-xs-block">
                  <input
                    type="text"
                    name="username"
                    placeholder="请输入订单号"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
                <div class="layui-input-inline layui-show-xs-block">
                  <button class="layui-btn" lay-submit lay-filter="sreach">
                    <i class="layui-icon">&#xe615;</i>
                  </button>
                </div>
              </form>
            </div>
            <div class="layui-card-header">
              <button class="layui-btn layui-btn-danger" onclick="delAll()">
                <i class="layui-icon"></i>批量删除
              </button>
           <!--   <button class="layui-btn" onclick="xadmin.open('添加用户','./order-add.html',800,600)">
                <i class="layui-icon"></i>添加
              </button>-->
          <Button  class="layui-btn" @click ="modal11 = true"> <i class="layui-icon"></i>添加</Button>
             <Modal v-model="modal11" fullscreen title="Fullscreen Modal">
                <OrderEdit></OrderEdit>
              </Modal>
            </div>
            <List :data_header="order_header" :data_list="order_List"></List>
            <div class="layui-card-body">
              <div class="page">
                <div>
                  <a class="prev" href>&lt;&lt;</a>
                  <a class="num" href>1</a>
                  <span class="current">2</span>
                  <a class="num" href>3</a>
                  <a class="num" href>489</a>
                  <a class="next" href>&gt;&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "../components/List.vue";
import OrderEdit from './OrderEdit.vue';
import web_config_setting from "../class/setting";
import Orders from "../class/orders";

export default {
  components: {
    List,
    OrderEdit
  },
  created: function() {
    this.init();
   
  },
  data: () => {
    return {
      order_header: web_config_setting.website_setting_order_data,
      order_List: new Array(),
      modal11: false
    };
  },
  methods: {
    init() {
      let self = this;
      let orders = new Orders();
      orders
        .getOrdersList(0)
        .then(res => {
          for (let item of res) {
            let o = {};
            (o.order_sn = item.order_sn),
              (o.order_user = item.order_user),
              (o.order_phone = item.order_phone),
              (o.order_amount = item.order_amount),
              (o.order_pay = item.order_pay),
              (o.order_state = item.order_state),
              (o.pay_state = item.pay_state),
              (o.deliver_state = item.deliver_state),
              (o.pay_method = item.pay_method),
              (o.deliver_method = item.deliver_method),
              (o.order_time = item.order_time);

            
            self.order_List.push(Array.of(o.order_sn,`${o.order_user} ${o.order_phone}`,
            o.order_amount,o.order_pay,o.order_state,o.pay_state,
            o.deliver_state,o.pay_method,o.deliver_method,o.order_time));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

