<template>
  <div class="layui-card-body">
    <table class="layui-table layui-form">
      <thead>
        <tr>
          <th>
            <input type="checkbox" name lay-skin="primary" />
          </th>

          <th v-for="(item,i) in data_header">{{item}}</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data_list">
          <td>
            <input type="checkbox" name lay-skin="primary" />
          </td>
          <!--<td>{{item.order_sn}}</td>
          <td>{{item.order_user}} {{item.order_phone}}</td>
          <td>{{item.order_amount}}</td>
          <td>{{item.order_pay}}</td>
          <td>{{item.order_state}}</td>
          <td>{{item.pay_state}}</td>
          <td>{{item.deliver_state}}</td>
          <td>{{item.pay_method}}</td>
          <td>{{item.deliver_method}}</td>
          <td>{{item.order_time}}</td>-->
          <td v-for="(e,j) in item">{{e}}</td>
          <td class="td-manage">
            <a title="查看" @click="click(i)" href="javascript:;">
              <i class="layui-icon">&#xe63c;</i>
            </a>
            <!--任务三：参照修改，添加列表 实现删除功能 ，同时修改Brand,Catalog,Goods相应的地方-->
            <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
              <i class="layui-icon">&#xe640;</i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ok } from 'assert';
export default {
  props: {
    data_header: [String],
    data_list: [Array],
  },
  data: {},
  methods:{
    click(index){
        this.$emit('my-click',index);
    }
  }
};
</script>
