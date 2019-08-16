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
              <Button class="layui-btn" @click="catalog_add">
                <i class="layui-icon"></i>添加
              </Button>
              <Modal v-model="modalcatalog" :title="catalogtitle" @on-ok="ok" @on-cancel="cancel">
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label" style="width:120px">分类名</label>
                  <div class="layui-input-inline">
                    <input type="text" class="layui-input" v-model="catalog.catName" />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label" style="width:120px">归属分类</label>
                  <div class="layui-input-inline">
                    <input type="text" class="layui-input" v-model="catalog.pid" />
                  </div>
                </div>
                <div class="layui-form-item" v-if="isupdate">
                  <label for="L_username" class="layui-form-label" style="width:120px">是否已废弃</label>
                  <div class="layui-input-inline">
                    <input type="text" class="layui-input" v-model="catalog.isDel" />
                  </div>
                </div>
              </Modal>
            </div>
            <List :data_header="catalogs_header" :data_list="catalog_List" @my-click="catalog_update"></List>
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
import Catalogs from "../class/catalog";

export default {
  components: {
    List
  },
  created: function() {
    this.init();
  },
  data: () => {
    return {
      catalogs_header: web_config_setting.website_setting_catalog_data,
      catalog_List: new Array(),
      catalog_List_All:new Array(),
      catalogtitle:"",
      catalog:{
        catId:"",
        pid:"",
        pcatName:"",
        catName:"",
        isDel:"否"
      },
      isupdate:false,
      modalcatalog: false
    };
  },
  methods: {
    init() {
      let self = this;
      let catalogs = new Catalogs();
      catalogs
        .getCatalogList(0)
        .then(res => {
          for (let item of res) {
            let obj = {};
            obj.catId = item.catId;
            obj.pid = item.pid;
            obj.pcatName = item.pcatName;
            obj.catName = item.catName;
            if (item.isDel) obj.isDel = "是";
            else obj.isDel = "否";
            self.catalog_List.push(
              Array.of(obj.catId, obj.catName, obj.pcatName, obj.isDel)
            );
            self.catalog_List_All.push(obj);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  ok(){
    let catalog=new Catalogs();
    if(this.catalog.isDel=="是")
       this.catalog.isDel=true;
    else
       this.catalog.isDel=false; 
    if(this.isupdate){
   
       catalog.updateCatalogInfo(this.catalog)
     }
     else
     {
       console.log(this.catalog)
       catalog.insertCatalogInfo(this.catalog)
     }
     this.$Message.info(`${this.catalogtitle} ${this.addcatalog}`)
    },
    cancel(){
      this.$Message.info('取消分类更改');
    },
    catalog_update(ev){
       this.catalog.catName=this.catalog_List_All[ev].catName;
       this.catalog.isDel=this.catalog_List_All[ev].isDel;
       this.catalog.pcatName=this.catalog_List_All[ev].pcatName;
       this.catalog.pid=this.catalog_List_All[ev].pid;
       this.catalog.catId=this.catalog_List_All[ev].catId;
       this.catalogtitle="更新产品分类"
       this.modalcatalog=true
       this.isupdate=true;
    },
    catalog_add(){
      this.catalog={
        catId:"",
        pid:"",
        pcatName:"",
        catName:"",
        isDel:"否"
      }
      this.catalogtitle="添加产品分类"
      this.modalcatalog=true;
      this.addcatalog=""
      this.isupdate=false;
    }
  }
};
</script>
