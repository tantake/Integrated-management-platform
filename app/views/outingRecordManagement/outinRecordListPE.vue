<!--进出记录-->
<template>
  <!-- <div class="commen-view-box"> -->
  <div class="forPE">
    <a-menu
      style="width: 256px"
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      :selectedKeys="[current]"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <a-icon type="mail" />人员进出记录
      </a-menu-item>
      <a-menu-item key="2">
         <i class="iconfont icon-\e645"></i>  车辆进出记录
      </a-menu-item>
    </a-menu>
    <PageContext>
      <a-spin :spinning="spinning">
        <a-form :form="form" @submit="onSearch">
          <a-row type="flex">
            <a-col :span="6">
              <a-form-item label="小区名称" :labelCol="{span:6}" :wrapperCol="{span:18}">
                <!-- <a-tree-select
                showSearch
                class="condi-input-comm"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择"
                treeDefaultExpandAll
                :treeData="housingList"
                treeNodeFilterProp="title"
                @change="changeHousingId"
                v-decorator="['housingId',{initialValue:housingId}]"
                ></a-tree-select>-->
                <a-input placeholder="请输入关键字搜索" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="姓名" :labelCol="{span:6}" :wrapperCol="{span:18}">
                <a-input placeholder="请输入关键字搜索" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="时间段" :labelCol="{span:6}" :wrapperCol="{span:18}">
                <a-range-picker
                  v-decorator="['time']"
                  class="comm-search-view"
                  style="width:250px"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="{span:6}" :wrapperCol="{span:18}">
                <div class="btn">
                  <a-button html-type="submit" type="primary">查询</a-button>
                  <a-button @click="onReset">重置</a-button>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div class="table-template" style="margin-top:10px">
          <div class="outinRecordList">
            <a-popover title="抓拍信息" placement="right" v-for="(item,index) in data" :key="index">
              <template slot="content" class="prop-content">
                <p class="prop-content-p prop-content-p-1">小区：{{item.housingName}}</p>
                <p class="prop-content-p">设备位置：{{item.positionAddress}}</p>
                <p class="prop-content-p prop-content-p-2">时间：{{item.createTime}}</p>
              </template>
              <div class="outinRecordList-div" @click="editM(item.id,index)">
                <img :src="item.url" alt />
              </div>
            </a-popover>
          </div>
        </div>
        <div class="page">
          <a-pagination
            :pageSizeOptions="pageSizeOptions"
            :total="totalCount"
            showSizeChanger
            :pageSize="limit"
            :current="page"
            @showSizeChange="onShowSizeChange"
            @change="handleCurrentChange"
          ></a-pagination>
        </div>
      </a-spin>
    </PageContext>
    <a-modal
      title="详细信息"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
    <div>

    </div>
    </a-modal>
  </div>
</template>

<script>
import util from "../../util/util";
import commInterface from "../../util/commInterface";
import PageContext from "../../components/PageContext.vue";

export default {
  name: "outinRecordListPE",
  components: { PageContext },
  data() {
    return {
      visible:false,
      current: "1",
      theme: "dark",
      type: 1,
      pageSizeOptions: commInterface.pageSizeOptions,
      data: [
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        },
        {
          housingName: "11",
          positionAddress: "11",
          createTime: "11",
          url: "../../images/bg.png"
        }
      ],
      page: 1,
      limit: 10,
      totalCount: 0,
      loading: false,
      housingList: [], //小区名称

      spinning: false,
      searchData: {},
      form: this.$form.createForm(this),
      housingId: "",
      areaAddress: "", //小区地址
      params: "" //从访客记录跳转到进出记录
    };
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
    },
    handleClick(e) {
      console.log("click ", e);
      this.current = e.key;
    },
    changeHousingId(val) {
      for (let i = 0, len = this.housingList.length; i < len; i++) {
        if (this.housingList[i].value == val) {
          this.areaAddress = this.housingList[i].areaCodeName;
        }
      }
    },
    onSearch() {
      let that = this;
      that.form.validateFields((error, fieldsValue) => {
        if (fieldsValue["time"] && fieldsValue["time"].length > 0) {
          var startTime =
            fieldsValue["time"][0].format("YYYY-MM-DD") + " 00:00:00";
          var endTime =
            fieldsValue["time"][1].format("YYYY-MM-DD") + " 23:59:59";
        }

        that.searchData = {
          startTime: startTime,
          endTime: endTime,
          housingId: fieldsValue["housingId"]
        };
        that.page = 1;
        that.getList();
      });
    },
    onReset() {
      this.form.resetFields();
      this.searchData = {
        startTime: "",
        endTime: "",
        housingId: this.housingId
      };
      this.page = 1;
      this.getList();
    },

    editM() {
      this.visible=true
    },

    onShowSizeChange(current, pageSize) {
      this.limit = pageSize;
      this.page = current;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },

    //获取小区名称
    getArea() {
      let that = this;
      commInterface
        .getArea(that)
        .then(function(res) {
          if (res.data.length > 0) {
            that.housingList = res.data.map(e => ({
              title: e.name,
              value: e.id + "",
              areaCodeName: e.areaCodeName
            }));
            that.housingId = res.data[0].id + "";
            that.areaAddress = res.data[0].areaCodeName;
            that.searchData = {
              housingId: that.housingId
            };
            // that.getBuilding();
            that.getList();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    imgUrl(url) {
      return `${window.imgUploadUrl}${url}?access_token=${sessionStorage.tokenOrigin}`;
    },
    //列表
    getList() {
      let that = this;
      let data = {
        page: that.page,
        limit: that.limit
        // ...that.searchData
      };
      if (that.params) {
        data.housingUserId = that.params;
        data.housingUserType = 8;
      }

      let url = `${window.baseUrl}/housingrecord/hRecord/page?${util.urlEncode(
        data
      )}`;
      that.spinning = true;
      that
        .axios({
          url: url,
          method: "post",
          headers: {
            Authorization: "Bearer" + sessionStorage.tokenOrigin
          }
        })
        .then(function(res) {
          that.spinning = false;
          if (res.data.status == 0) {
            that.data = res.data.page.list;
            that.totalCount = res.data.page.totalCount;
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          that.spinning = false;
        });
    }
  },
  created() {},
  mounted() {
    let that = this;
    that.getArea();
    that.params = that.$route.query.params ? that.$route.query.params : "";
    // that.getList();
  }
};
</script>
<style scoped>
@import "../../assets/css/outinRecordList.css";
@import "../../assets/css/commen.css";
.ant-pagination {
  text-align: center !important;
}
.forPE {
  display: flex;
  justify-content: space-between;
}
.ant-menu-item-selected {
  background-color: #555555 !important;
  color: white;
  border-right: none !important;
}
.forPE{
  
}
</style>
