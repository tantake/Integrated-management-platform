<!--身份核验记录-->
<template>
  <PageContext>
    <SearchBar :option="option" @onSearch="handleSearch"></SearchBar>
    <TablePage :columns="columns" :req="getList" :reqData="{...searchData}" />
    <a-modal title="访客详情" v-model="visitorDia" :footer="null">
      <div class="visi-info">
        <div class="visi-img" v-if="items.url">
          <img :src="imgUrl(items.url)" alt />
        </div>
        <div class="visi-con">
          <div>
            <p>
              <span>拜访姓名：</span>
              <span>{{items.visitorName}}</span>
            </p>
            <p>
              <span>授权人：</span>
              <span>某某某</span>
            </p>
          </div>
          <div>
            <p>
              <span>小区名称：</span>
              <span>{{items.housingName}}</span>
            </p>
            <p>
              <span>开锁方式：</span>
              <span>{{items.visitorType}}</span>
            </p>
          </div>
          <div>
            <p>
              <span>拜访地址：</span>
              <span>{{items.housingName}}</span>
            </p>
            <p>
              <span>提交时间：</span>
              <span>{{items.createTime}}</span>
            </p>
          </div>
          <div>
            <p>
              <span>申请时长：</span>
              <span>{{items.startTime}}至{{items.endTime}}</span>
            </p>
          </div>
        </div>
      </div>
    </a-modal>
  </PageContext>
</template>

<script>
import util from "../../../static/js/util";
import commInterface from "../../../static/js/commInterface";
import PageContext from "../../components/PageContext";
import SearchBar from "../../components/SearchBar";
import TablePage from "../../components/TablePage";

export default {
  name: "visitorManagement",
  components: { PageContext, SearchBar, TablePage },
  data() {
    return {
      option: [
        {
          name: "小区",
          key: "housingId",
          defaultValue: null,
          type: "tree",
          opt: [],
          placeholder: "请选择小区"
        }
      ],
      columns: [
        {
          title: "访客姓名",
          dataIndex: "visitorName",
          key: "visitorName",
          align: "center"
        },
        {
          title: "小区名称",
          dataIndex: "housingName",
          key: "housingName",
          align: "center"
        },
        {
          title: "拜访地址",
          dataIndex: "fullName",
          key: "fullName",
          align: "center"
        },
        {
          title: "申请时长",
          dataIndex: "time",
          key: "time",
          align: "center",

          customRender: (text, record) => {
            return `${record.startTime}~${record.endTime}`;
          }
        },
        {
          title: "开锁方式",
          dataIndex: "visitorTypeStr",
          key: "visitorTypeStr",
          align: "center"
        },
        {
          title: "头像",
          dataIndex: "url",
          key: "url",
          align: "center",
          customRender: (text, record) => {
            return (
              
              <img
                src={commInterface.imgUrl(record.url)}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            );
          }
        },
        {
          title: "授权人",
          dataIndex: "housingUserName",
          key: "housingUserName",
          align: "center"
        },
        {
          title: "提交时间",
          dataIndex: "createTime",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          dataIndex: "xx",
          key: "xx",
          align: "center",

          width: 200,
          customRender: (text, record) => {
            return (
              <div style="display:flex;justifyContent:space-around;">
                <a
                  herf="javascript:;"
                  onClick={this.toRecord.bind(this, record.id)}
                >
                  进出记录{" "}
                </a>
                <a
                  herf="javascript:;"
                  onClick={this.lookDetail.bind(this, record)}
                >
                  查看{" "}
                </a>
              </div>
            );
          }
        }
      ],
      searchData: {},
      visitorDia: false,
      items: {}
    };
  },
  methods: {
    handleSearch(val) {
      this.searchData = val;
    },

    lookDetail(items) {
      this.items = items;
      this.visitorDia = true;
    },

    imgUrl(url) {
      if (url) {
        return commInterface.imgUrl(url);
      } else {
        return null;
      }
    },

    //进出记录
    toRecord(id) {
      if (sessionStorage.outingRecorPath) {
        this.$router.push({
          path: `${sessionStorage.outingRecorPath}?params=${id}`
        });
      }
    },

    getList(data) {
      let that = this;
      return new Promise(function(resolve) {
        that
          .axios({
            url: `${window.baseUrl}/housinguser/housinguser/visitor/page?${data}`,
            method: "POST",
            data: data,
            headers: {
              Authorization: "Bearer" + sessionStorage.tokenOrigin
            }
          })
          .then(function(res) {
            if (res.data.status == 0) {
              resolve(res.data);
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            error(that, err.message);
          });
      });
    },
    //小区列表
    getArea() {
      let that = this;
      commInterface
        .getArea(that)
        .then(function(res) {
          that.option[0].opt = res.data.map(e => ({
            title: e.name,
            value: e.id + ""
          }));
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {
    let that = this;
    that.getArea();
  }
};
</script>
<style scoped>
@import "../../../static/less/commen.css";
@import "../../../static/less/visitor.css";
</style>
