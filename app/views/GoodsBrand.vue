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
    <!--任务四：Brand,Catalog,Goods 的检索条件编写-->
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
              <Button class="layui-btn" @click="brand_add">
                <i class="layui-icon"></i>添加
              </Button>
              <Modal v-model="modalbrand" :title="brandtitle" @on-ok="ok" @on-cancel="cancel">
                   <div class="layui-form-item">
                        <label for="L_username" class="layui-form-label" style="width:120px">商品品牌</label>
                        <div class="layui-input-inline">
                            <input type="text"  class="layui-input" v-model="brand.brandName">
                        </div>
                    </div>
                     <div class="layui-form-item" v-if="isupdate">
                        <label for="L_username" class="layui-form-label" style="width:120px">是否已废弃</label>
                        <div class="layui-input-inline">
                            <input type="text"  class="layui-input" v-model="brand.isDel">
                        </div>
                    </div>
              </Modal>
            </div>
            <List :data_header="brands_header" :data_list="brands_List"  @my-click="brand_update"></List>
            <!--任务五:翻页功能实现-->
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
import web_config_setting from "../class/setting";
import Brands from "../class/brands";

export default {
  components: {
    List
  },
  created: function() {
    this.init();
  },
  data: () => {
    return {
      brands_header: web_config_setting.website_setting_brand_data,
      brands_List: new Array(),
      modalbrand: false,
      brand:{
        brandName:"",
        isDel:"否",
        brandId:""
      },
      brandtitle:"",  
      isupdate:false,
      brands_List_All:new Array()
    };
  },
  watch:{
   
  },
  methods: {
    init() {
      let self = this;
      let brands = new Brands();
      brands
        .getBrandsList(0)
        .then(res => {
          for (let item of res) {
            let obj = {};
            obj.brandId = item.brandId;
            obj.brandName = item.brandName;
            if (item.isDel) obj.isDel = "是";
            else obj.isDel = "否";
            self.brands_List.push(Array.of(obj.brandId,obj.brandName,obj.isDel));
            self.brands_List_All.push(obj);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ok(){
      let brand = new Brands();
      if(this.brand.isDel=="是")
       this.brand.isDel=true;
       else
       this.brand.isDel=false; 
     if(this.isupdate){
       brand.updateBrandsInfo(this.brand)
     }
     else
     {
       let self =this;
       brand.insertBrandsInfo(this.brand)
     }
     this.$Message.info(`${this.brandtitle} ${this.addbrand}`)
    },
    cancel(){
      this.$Message.info('取消品牌更改');
    },
    brand_update(ev){
       this.brand.brandName=this.brands_List_All[ev].brandName;
       this.brand.isDel=this.brands_List_All[ev].isDel;
       this.brand.brandId=this.brands_List_All[ev].brandId;
       this.brandtitle="更新品牌"
       this.modalbrand=true
       this.isupdate=true;
       console.log("update: ",this.brand)
    },
    brand_add(){
      this.brandtitle="添加品牌"
      this.modalbrand=true;
      this.brand={brandName:""}
      this.isupdate=false;
    }
  }
};
</script>
