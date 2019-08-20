<template>
  <div>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>
<style >

</style>

