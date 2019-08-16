<template>
<PageContext>
  <div>
    <SearchBar :option="option" @onSearch="handleSearch"></SearchBar>
    <TablePage :columns="columns" ></TablePage>
  </div>
</PageContext>

</template>
<script>
import SearchBar from "../components/SearchBar.vue";
import TablePage from "../components/TablePage.vue";
import PageContext from "../components/PageContext.vue";
export default {
  data() {
    return {
        columns:[
        {
          title: "登记日期",
          dataIndex: "createTime",
          align: "center"
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
      
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          align: "center",
        },
        {
          title: "证件编号",
          dataIndex: "idcard",
          align: "center"
        },
        {
          title: "住址",
          dataIndex: "address",
          align: "center"
        },
        {
          title: "人员类型",
          dataIndex: "typeStr",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "xx",
          key: "xx",
          align: "center",
          width: 150,
        }
      ],
      option: [
        {
          name: "小区",
          key: "housingId",
          defaultValue: null,
          type: "tree",
          opt: [],
          placeholder: "请选择小区"
        },
        {
          name: "楼栋",
          key: "buildingName",
          defaultValue: null,
          type: "text",
          placeholder: "请输入楼栋"
        },
        {
          name: "单元",
          key: "unitName",
          defaultValue: null,
          type: "text",
          placeholder: "请输入单元"
        },
        {
          name: "楼层",
          key: "layerName",
          defaultValue: null,
          type: "text",
          placeholder: "请输入楼层"
        },
        {
          name: "房号",
          key: "roomName",
          defaultValue: null,
          type: "text",
          placeholder: "请输入房号"
        },
        {
          name: "姓名",
          key: "name",
          defaultValue: null,
          type: "text",
          placeholder: "请输入姓名"
        },
        {
          name: "性别",
          key: "sex",
          defaultValue: null,
          type: "select",
          placeholder: "请选择性别"
        },
        {
          name: "联系电话",
          key: "mobile",
          defaultValue: null,
          type: "text",
          placeholder: "请输入联系电话"
        },
        {
          name: "人员类型",
          key: "housingUserType",
          defaultValue: null,
          type: "select",
          placeholder: "请选择人员类型"
        },
        {
          name: "数据来源",
          key: "dataType",
          defaultValue: null,
          type: "select",
          placeholder: "请选择人员类型"
        }
      ]
    };
  },
  components: {
    SearchBar,
    TablePage,
    PageContext
  },
  methods: {
    handleSearch(val) {
      this.searchData = {
        type: 1
      };
    }
  }
};
</script>

<style  scoped>
</style>