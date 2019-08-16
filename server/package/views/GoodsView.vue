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
              <Button class="layui-btn" @click="goods_add">
                <i class="layui-icon"></i>添加
              </Button>
              <Modal v-model="modalgoods" fullscreen :title="goodstitle">
                <GoodsEdit :formValidate="goodssel" :isupdate="isupdate"></GoodsEdit>
              </Modal>
            </div>
            <List :data_header="goods_header" :data_list="goods_List" @my-click="goods_update"></List>
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
import GoodsEdit from "./GoodsEdit.vue";
import web_config_setting from "../class/setting";
import Goods from "../class/goods";

export default {
  components: {
    List,
    GoodsEdit
  },
  created: function() {
    this.init();
  },
  data: () => {
    return {
      goods_header: web_config_setting.website_setting_goods_data,
      goods_List: new Array(),
      goods_List_All: new Array(),
      //控制商品添加/更新展示
      modalgoods: false,
      goodstitle: "",
      isupdate: false,
      goodssel: {
        goodsId:"",
        goodsName: "",
        goodsSubtitle: "",
        goodsKeywords: "",
        supplyId: 0,
        brandId: "",
        catId: "",
        goodsSn: "",
        goodsRetailPrice: "",
        goodsFactoryPrice: "",
        goodsBasicPrice: "",
        goodsWeight: "",
        goodsCube: "",
        IsGoodsNew: 0,
        NewGoodsSort: 1,
        GoodsShowSort: 1,
        IsGoodsShow: 0,
        goodsDesc: "",
        isShelves: 0,
        uploadList: []
      }
    };
  },
  methods: {
    init() {
      let self = this;
      let goods = new Goods();
      goods
        .getGoodsList(0)
        .then(res => {
          for (let item of res) {
            let obj = {};
            obj.goodsId=item.goodsId
            obj.goodsName = item.goodsName;
            obj.goodsSubtitle = item.goodsSubtitle;
            obj.goodsKeywords = item.goodsKeywords;
            obj.supplyId = item.supplyId + "";
            obj.brandId = item.brandId + "";
            obj.catId = item.catId + "";
            obj.supplyName = item.supplyName;
            obj.brandName = item.brandName;
            obj.catName = item.catName;
            obj.goodsSn = item.goodsSn;
            obj.goodsRetailPrice = item.goodsRetailPrice;
            obj.goodsFactoryPrice = item.goodsFactoryPrice;
            obj.goodsBasicPrice = Math.floor(item.goodsBasicPrice * 100) / 100;
            obj.goodsWeight = item.goodsWeight;
            obj.goodsCube = item.goodsCube;
            obj.goodsDesc = item.goodsDesc;
            if (item.isShelves == true) obj.isShelves = "是";
            else obj.isShelves = "否";
            self.goods_List.push(
              Array.of(
                obj.goodsSn,
                obj.catName,
                obj.goodsName,
                obj.goodsRetailPrice,
                obj.goodsFactoryPrice,
                obj.goodsBasicPrice,
                obj.isShelves
              )
            );
            if (item.isShelves == true) obj.isShelves = "1";
            else obj.isShelves = "0";
            //obj.supplyId = "1";
            obj.uploadList=[];
            self.goods_List_All.push(obj);
            console.log('goods in ',obj);
          }
        })
        .catch(err => {
          console.log(err);
        });
        console.log('goods in ---------> ');
    },
    goods_update(ev) {
      this.goodssel = this.goods_List_All[ev];
      this.goodstitle = "更新商品";
      this.modalgoods = true;
      this.isupdate = true;
    },
    goods_add() {
      this.goodstitle = "添加商品";
      this.modalgoods = true;
      this.goodssel = {
        goodsId:"",
        goodsName: "",
        goodsSubtitle: "",
        goodsKeywords: "",
        supplyId: 0,
        brandId: "",
        catId: "",
        goodsSn: "",
        goodsRetailPrice: "",
        goodsFactoryPrice: "",
        goodsBasicPrice: "",
        goodsWeight: "",
        goodsCube: "",
        IsGoodsNew: 0,
        NewGoodsSort: 1,
        GoodsShowSort: 1,
        IsGoodsShow: 0,
        goodsDesc: "",
        isShelves: 0,
        uploadList: []
      };
      this.isupdate = false;
    }
  }
};
</script>

