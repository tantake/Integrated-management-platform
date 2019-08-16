<template>
  <div id="searchBar">
    <a-form :form="form" @submit="onSearch">
      <a-row type="flex">
        <a-col :span="8" v-for="(item, i) in option" :key="i">
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='tree'"
          >
            <a-tree-select
              showSearch
              v-decorator="[item.key]"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="item.placeholder"
              allowClear
              treeDefaultExpandAll
              class="comm-search-view"
              :treeData="item.opt"
              treeNodeFilterProp="title"
            ></a-tree-select>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='treeHous'"
          >
            <a-tree-select
              showSearch
              v-decorator="[item.key]"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="item.placeholder"
              allowClear
              treeDefaultExpandAll
              class="comm-search-view"
              :treeData="item.opt"
              treeNodeFilterProp="title"
              @change="onChange"
            ></a-tree-select>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='treePoint'"
          >
            <a-tree-select
              showSearch
              v-decorator="[item.key]"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="item.placeholder"
              :allowClear="false"
              treeDefaultExpandAll
              class="comm-search-view"
              :treeData="item.opt"
              treeNodeFilterProp="title"
              @change="onChange"
            ></a-tree-select>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='select'"
          >
            <a-select
              v-decorator="[item.key]"
              :placeholder="item.placeholder"
              class="comm-search-view"
            >
              <a-select-option
                v-for="(e,index) in item.opt"
                :key="index"
                :value="e.value"
              >{{e.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='selectThres'"
          >
            <a-select
              v-decorator="[item.key]"
              :placeholder="item.placeholder"
              class="comm-search-view"
              @change="changType"
            >
              <a-select-option
                v-for="(e,index) in item.opt"
                :key="index"
                :value="e.value"
              >{{e.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <!-- 小区同步详情 -->
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='selectSynch'"
          >
            <a-select
              v-decorator="[item.key,{initialValue: 1}]"
              :placeholder="item.placeholder"
              class="comm-search-view"
              @change="changType"
            >
              <a-select-option
                v-for="(e,index) in item.opt"
                :key="index"
                :value="e.value"
              >{{e.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='text'"
          >
            <a-input
              v-decorator="[item.key]"
              :placeholder="item.placeholder"
              class="comm-search-view"
            ></a-input>
          </a-form-item>
          <a-form-item
            :label="item.name"
            :labelCol="{span:6}"
            :wrapperCol="{span:18}"
            v-if="item.type==='dateRange'"
          >
           
            <a-range-picker   v-decorator="[item.key]" class="comm-search-view"   format="YYYY-MM-DD"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :labelCol="{span:6}" :wrapperCol="{span:18}">
            <div class="btn">
              <a-button html-type="submit" type="primary">搜索</a-button>
              <a-button @click="onReset" v-if="isReseat">重置</a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

export default {
  props: {
    option: {
      type: Array,
      default: () => []
    },
    isReseat: {
      type: Boolean,
      default: () => true
    },
    origin: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      format: ["YYYY-MM-DD", "YYYY-MM-DD"],
      value: ""
    };
  },
  methods: {
    //人员阀值管理选择类型
    changType(val) {
      this.$emit("getType", val);
    },
    //小区
    onChange(val) {
      this.$emit("getHousingId", val);
    },

    onReset() {
      this.form.resetFields();
      let fieldsValue = this.form.getFieldsValue();
      this.$emit("onSearch", fieldsValue);
      console.log(this.form.getFieldsValue());
    },
    onSearch(e) {
      e.preventDefault();
      let that = this;
      this.form.validateFields((error, fieldsValue) => {
        console.log("Received values of form: ", fieldsValue);
        if(fieldsValue['time']){
          let time=fieldsValue['time']
          delete fieldsValue['time']
          let data={
            startTime:time[0].format('YYYY-MM-DD')+' 00:00:00',
            endTime:time[1].format('YYYY-MM-DD')+' 23:59:59',
          }
          that.$emit("onSearch", data);
        }else{
           that.$emit("onSearch", fieldsValue);
        }
        
      });
    }
  }
};
</script>

<style scoped>

.btn {
  padding-left: 30px;
  margin-left: 30px
}

.btn .ant-btn {
  margin-right: 10px;
}

.comm-search-view {
  max-width: 300px;
}
</style>

