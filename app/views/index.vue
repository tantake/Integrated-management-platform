<template>
  <div class="home">
    <nav>
      <ul>
        <li
          v-for="(item,index) in list"
          :class="[index==4?'forTi':index==status?'bechoice':'']"
          :key="index"
          @click="choice(index)"
        >{{item.title}}</li>
      </ul>
    </nav>
    <div class="forImg">
      <img :src="imgUrl" alt />
    </div>
    <!-- <div class="forSearch">
      <a-input-search placeholder="请输入小区名称" enterButton="搜索" size="large" />
    </div> -->
    <div>
      <router-view></router-view>
    </div>
    <!-- <div class="home-tab">
      <div class="tab-content">
        <img :src="tab1" alt />
      </div>
      <ul class="tab-name">
        <li class="active">辖区</li>
        <li>报警</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ["mail"],
      tab1: "../images/tab1.png",
      tabList: ["辖区", "报警"],
      status: 0,
      imgUrl: "../images/lightline.png",
      imgUrl2: "../images/backup.png",
      list: [
        {
          title: "首页",
          url: "index"
        },
        {
          title: "社区便民",
          url: "communityConvenience"
        },
        {
          title: "社区服务"
        },
        {
          title: "社区管理",
          url: "communityManagement/CaringStaff"
        },
        {
          title: "石羊街道办社区管理平台",
          class: "forTi"
        },
        {
          title: "报警任务"
        },
        {
          title: "数据概览"
        },
        {
          title: "进出记录",
          url: "/outingRecordManagement/outinRecordListPE"
        },
        {
          title: "档案库"
        }
      ]
    };
  },
  methods: {
    choice(index) {
      let that=this
      this.status = index;
      this.$router.push({path:that.list[index].url})
    }
  }
};
</script>

<style>
@import "../css/nav.css";
.home {
  width: 100%;
  height: 100%;
}
.home-tab {
  position: fixed;
  right: 2.5%;
  top: 120px;
  display: flex;
  cursor: pointer;
}
.tab-content {
  z-index: 1;
  width: 450px;
  height: 800px;
  border: 2px solid #be9933;
  background-color: rgba(0, 0, 0, 0.6);
}
.tab-content img {
  width: 80%;
  margin: 20px auto;
  display: block;
}
.tab-name {
  z-index: 2;
  width: 40px;
  margin-left: -2px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
}
.tab-name li {
  position: relative;
  box-sizing: border-box;
  padding: 10px 10px 0;
  width: 40px;
  height: 68px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
  color: white;
  display: flex;
  margin-bottom: 20px;
  text-align: center;
}
.tab-name li::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  border-left: 2px solid #be9933;
  transform: skewY(30deg);
}
.active::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 2px solid #be9933;
  border-right: 2px solid #be9933;
  border-bottom: 2px solid #be9933;
  border-left: 2px solid rgba(0, 0, 0, 0.6) !important;
  background-color: rgba(0, 0, 0, 0.6);
  transform: skewY(30deg);
}
</style>