<template>
  <div id="table-page">
    <a-table
      bordered
      :pagination="false"
      :rowKey="id"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :scroll="scroll"
    ></a-table>
    <div class="page" v-if="ispagination">
      <a-pagination
        :pageSizeOptions="['10', '20', '30', '40']"
        :total="total"
        showSizeChanger
        :pageSize="limit"
        :current="page"
        @showSizeChange="onShowSizeChange"
        @change="handleCurrentChange"
      ></a-pagination>
      <!-- <a-button class="back-bottom edit-btn" size="small" @click="back" v-if="hasBack">返回</a-button> -->
    </div>
  </div>
</template>

<script>
import util from "../js/util";

export default {
  props: {
    scroll: {
      type: Object,
      default: () => {}
    },
    ispagination: {
      type: Boolean,
      default: () => true
    },
    url: {
      type: String,
      default: () => ""
    },
    hasBack: {
      type: Boolean,
      default: () => false
    },
    id: {
      type: String,
      default: () => "id"
    },
    columns: {
      type: Array,
      default: () => []
    },
    faceThresholdId: {
      type: String,
      default: () => "faceThresholdId"
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    req: {
      type: Function,
      default: () => {}
    },
    reqData: {
      type: Object,
      default: () => {}
    },
    isrefresh: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    reqData(val, val1) {
  
      if (JSON.stringify(val) != JSON.stringify(val1)) {
        this.page = 1;
        this.queryList();
      }
    },
    isrefresh(val) {
      if (val) {
        this.queryList();
      }
    }
  },
  data() {
    return {
      page: 1,
      limit: 10,
      data: [],
      total: 0,
    };
  },
  methods: {
    back() {
      console.log(this.url);
      this.$router.push({
        path: this.url
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.queryList();
    },
    onShowSizeChange(current, pageSize) {
      this.limit = pageSize;
      this.page = current;
      this.queryList();
    },
    async queryList() {
      let that = this;
      that.loading = true;
      let data = {};
      if (that.ispagination) {
        data = {
          page: that.page,
          limit: that.limit,
        };
      } else {
        data = {
        };
      }
      that.req(util.urlEncode(data)).then(function(res) {
        that.loading = false;
        if (that.ispagination) {
            that.data = res.page.list;
          that.total = res.page.totalCount;
        } else {
          that.data = res.data;
        }
        that.$emit("getData", that.data);
      });
    }
  },
  mounted() {
    this.queryList();
  }
};
</script>

<style scoped>
#table-page {
  padding: 10px;
}
.page {
  position: relative;
}
.edit-btn {
  padding: 0px 20px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.back-bottom {
  position: absolute;
  left: 20px;
  top: 0;
}
.ant-table td { white-space: nowrap; }
</style>
