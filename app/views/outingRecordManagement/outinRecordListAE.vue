<!--进出记录-->
<template>
  <PageContext>
     <a-spin :spinning="spinning">
    <a-form :form="form" @submit="onSearch">
      <a-row type="flex">
        <a-col :span="8">
          <a-form-item label="小区名称" :labelCol="{span:6}" :wrapperCol="{span:18}">
            <a-tree-select
              showSearch
              class="condi-input-comm"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择"
              treeDefaultExpandAll
              :treeData="housingList"
              treeNodeFilterProp="title"
              @change="changeHousingId"
              v-decorator="['housingId',{initialValue:housingId}]"
            ></a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="时间段" :labelCol="{span:6}" :wrapperCol="{span:18}">
            <a-range-picker v-decorator="['time']" class="comm-search-view" style="width:250px" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="人员类型" :labelCol="{span:6}" :wrapperCol="{span:18}">
            <a-select class="condi-input-comm" v-decorator="['housingUserType',]" placeholder="请选择人员类型">
              <a-select-option v-for="item in userType" :key="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :labelCol="{span:6}" :wrapperCol="{span:18}">
            <div class="btn">
              <a-button html-type="submit" type="primary">搜索</a-button>
              <a-button @click="onReset">重置</a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-tabs :defaultActiveKey="1" :animated="false">
      <a-tab-pane :key="1" tab="图片显示">
        <div class="table-template" style="margin-top:10px">
          <div class="outinRecordList">
            <a-popover title="抓拍信息" placement="right" v-for="(item,index) in data" :key="index">
              <template slot="content" class="prop-content">
                <p class="prop-content-p prop-content-p-1">小区：{{item.housingName}}</p>
                <p class="prop-content-p">设备位置：{{item.positionAddress}}</p>
                <p class="prop-content-p prop-content-p-2">时间：{{item.createTime}}</p>
              </template>
              <div class="outinRecordList-div" @click="editM(item.id,index)">
                <img :src="imgUrl(item.url)" alt />
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
      </a-tab-pane>
      <a-tab-pane :key="2" tab="列表显示">
        <div  class="table-template">
          <a-table
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="data"
           
            :pagination="false"
          >
            <template slot="imgUrl" slot-scope="text, record">
              <img :src="imgUrl(record.url)" alt width="38" />
            </template>
            <template slot="operation" slot-scope="text, record,index">
              <div class="options-btn-text">
                <span @click="editM(record.id,index)">查看</span>
              </div>
            </template>
          </a-table>
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
        </div>
      </a-tab-pane>
    </a-tabs>

    </a-spin>
  </PageContext>

</template>

<script>
import util from "../../../static/js/util";
import commInterface from "../../../static/js/commInterface";
import PageContext from "../../components/PageContext";

const columns = [
  {
    title: "小区名称",
    dataIndex: "housingName",
    align: "center"
  },
  {
    title: "设备名称",
    dataIndex: "positionAddress",
    align: "center"
  },
  {
    title: "时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center"
  },
  {
    title: "姓名",
    dataIndex: "userName",
    key: "userName",
    align: "center"
  },
  {
    title: "人脸图",
    dataIndex: "imgUrl",
    key: "imgUrl",
    align: "center",
    scopedSlots: { customRender: "imgUrl" }
  },
  {
    title: "性别",
    dataIndex: "sexName",
    key: "sexName",
    align: "center"
  },
  {
    title: "人员类型",
    dataIndex: "housingUserTypeStr",
    key: "housingUserTypeStr",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "xx",
    key: "xx",
    align: "center",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  name: "outinRecordListAE",
  components: { PageContext },
  data() {
    return {
      type: 1,
      pageSizeOptions: commInterface.pageSizeOptions,
      data: [],
      page: 1,
      limit: 10,
      totalCount: 0,
      columns,
      housingList: [], //小区名称
      userType: commInterface.userType,
      buildingList: [],
      info: {
        housingUserType: "",
        housingId: "",
        time: []
      },
      spinning: false,
      housingId: "",//小区名称
      form: this.$form.createForm(this),
      searchData:{},
      areaAddress:'',//小区地址
      params:'',//从访客记录跳转到进出记录
    };
  },
  methods: {
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
          housingId: fieldsValue["housingId"],
          housingUserType: fieldsValue["housingUserType"]
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
     changeHousingId(val) {
      for (let i = 0, len = this.housingList.length; i < len; i++) {
        if (this.housingList[i].value==val) {
          this.areaAddress = this.housingList[i].areaCodeName;
        }
      }
    },


    editM(id, index) {
      let arr = [];
      this.data.forEach(val => {
        arr.push(val.id);
      });
      sessionStorage.idArr = JSON.stringify(arr);
      this.$router.push({
        path: `/outingRecordManagement/outinRecordInfo/${id}_${index}_AE`
      });
    },
    switchBar(type) {
      this.type = type;
    },
    //更改小区名称
    onHousingIdChange(val) {
      this.info.housingId = val;
      this.info.buildingId = "";
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
        limit: that.limit,
        ...that.searchData
      };
      
    if(that.params){
      data.housingUserId=that.params;
      data.housingUserType=8;
    }
      that.spinning = true;
      let url = `${window.baseUrl}/housingrecord/hRecord/page?${util.urlEncode(
        data
      )}`;
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
    that.params=that.$route.query.params?that.$route.query.params:'';
   
  }
};
</script>
<style scoped>
@import "../../../static/less/outinRecordList.css";
@import "../../../static/less/commen.css";
</style>
