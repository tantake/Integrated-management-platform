<template>
  <div class="real-detail commen-view-box">
    <a-spin :spinning="spinning">
      <div class="real-title">
        <div>地址：{{areaAddress}}</div>
        <div>
          <span>小区：{{data.housingName}}</span>
          <span>设备位置：{{data.positionAddress}}</span>
          <span v-if="type=='AE'">相似度：{{data.faceScore}}%</span>
        </div>
      </div>
      <div class="real-top">
        <div class="img-box">
          <div class="box-item" @click="activeChange(1,`${data.url}`)">
            <div class="allimg face">
              <img alt :src="data.url" @load="setImg(`${data.url}`,140,140,'face')" ref="face" />
            </div>
            <span class="box-item-text" :class="[activeFlag==1?'box-item-text-active':'']">人脸图</span>
          </div>
          <div class="box-item box-item1" @click="activeChange(2,`${data.backgroundUrl}`)">
            <div class="allimg scence">
              <img
                :src="`${data.backgroundUrl}`"
                alt
                @load="setImg(`${data.backgroundUrl}`,140,105,'scence')"
                ref="scence"
              />
            </div>
            <span class="box-item-text" :class="[activeFlag==2?'box-item-text-active':'']">场景图</span>
          </div>
          <div
            class="box-item box-item1 box-item-last"
            v-if="type=='AE'&&data.faceUrl"
            @click="activeChange(3,`${data.faceUrl}`)"
          >
            <div class="allimg target">
              <img
                :src="`${data.faceUrl}`"
                @load="setImg(`${data.faceUrl}`,140,178,'target')"
                ref="target"
              />
            </div>
            <span class="box-item-text" :class="[activeFlag==3?'box-item-text-active':'']">目标命中图</span>
          </div>
          <div style="width: 100%;height: 20px"></div>
          <div></div>
        </div>
        <div class="con-info">
          <div class="con-img con-img-outing" ref="wrapper" v-if="type=='AE'&&data.housingUserId">
            <a-popover placement="right" style="width:300px" title="人员基本信息">
              <template slot="content">
                <div class="mask-outing">
                  <p>姓名：{{data.userName}}</p>
                  <p>性别：{{data.sexName}}</p>
                  <p>人员类型：{{data.housingUserTypeStr}}</p>

                  <p>家庭住址：{{detailAddress}}</p>
                  <p style="height:10px"></p>
                </div>
              </template>

              <div class="mask-outing-background">
                <div :style="{backgroundImage: `url(${url})`}"></div>
              </div>
            </a-popover>
          </div>

          <div class="con-img con-img-outing" ref="wrapper" v-else>
            <div class="mask-outing-background">
              <div :style="{backgroundImage: `url(${url})`}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="con-bottom">
        <a-button type="primary" @click="click('prev')" class="edit-btn" size="small">上一条</a-button>
        <a-button
          type="primary"
          @click="click('next')"
          class="edit-btn"
          size="small"
          style="margin: 0 30px"
        >下一条</a-button>
        <a-button @click="back" class="edit-btn" size="small">返回</a-button>

        <!--<div :class="[disabledFlag==1?'disabled':'']" class="cursor">上一条</div>-->
        <!--<div @click="click('next')" :class="[disabledFlag==2?'disabled':'']" class="cursor">下一条</div>-->
      </div>
    </a-spin>
  </div>
</template>

<script>
import commInterface from "../../../static/js/commInterface";
import util from "../../../static/js/util";
export default {
  name: "outinRecordInfo",
  data() {
    return {
      spinning: false,
      data: {},
      url: "",
      activeFlag: 2,
      disabledFlag: 0,
      index: "",
      pos: {},
      hasShow: false,
      housingId: 0,
      arr: [],

      queryId: "",
      idCard: "", //页面传入的idCard
      areaAddress: "",
      type: "",
      detailAddress: ""
    };
  },
  watch: {
    index: {
      //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      handler(curVal, oldVal) {
        // conosle.log(curVal,oldVal)
        if (curVal == 0) {
          this.disabledFlag = 1;
        } else if (curVal == this.arr.length - 1) {
          this.disabledFlag = 2;
        } else {
          this.disabledFlag = 0;
        }
      },
      deep: true
    }
  },
  methods: {
    imgMousemove(e) {
      if (!this.hasShow) return;
      let clientX = e.clientX;
      let clientY = e.clientY;
      let wrapperWidth = this.$refs.wrapper.clientWidth;
      let wrapperHeight = this.$refs.wrapper.top;
      let pos = {
        left: clientX - wrapperWidth - 75,
        top: clientY - 200
      };
      this.pos = pos;
    },
    imgMouseenter(e) {
      this.hasShow = true;
    },
    imgMouseleave(e) {
      if (
        (e.relatedTarget.className &&
          e.relatedTarget.className == "alermReal-title mt0") ||
        (e.relatedTarget.className && e.relatedTarget.className == "mask")
      )
        return;
      this.hasShow = false;
    },
    maskMouseleave() {
      this.hasShow = false;
    },
    maskMousemove() {
      this.hasShow = true;
    },
    maskMouseenter() {
      this.hasShow = true;
    },
    setImg(url, FitWidth, FitHeight, ele) {
      let that = this;
      this.imgLoadEvent(function(obj) {
        if (obj) {
          if (obj.w / obj.h >= FitWidth / FitHeight) {
            if (obj.w > FitWidth) {
              //ImgD.width = FitWidth;
              //ImgD.height = (obj.h * FitWidth) / image.width;
              that.$refs[ele].style.width = `${FitWidth}px`;
              that.$refs[ele].style.height = `${(obj.h * FitWidth) / obj.w}px`;
              let top = (obj.h * FitWidth) / obj.w / 2,
                left = FitWidth / 2;
              that.$refs[ele].style.marginTop = `-${top}px`;
              that.$refs[ele].style.marginLeft = `-${left}px`;
            } else {
              that.$refs[ele].style.width = `${obj.w}px`;
              that.$refs[ele].style.height = `${obj.h}px`;
              let top = obj.h / 2,
                left = obj.w / 2;
              that.$refs[ele].style.marginTop = `-${top}px`;
              that.$refs[ele].style.marginLeft = `-${left}px`;
            }
          } else {
            if (obj.h > FitHeight) {
              that.$refs[ele].style.width = `${(obj.w * FitHeight) / obj.h}px`;
              that.$refs[ele].style.height = `${FitHeight}px`;
              let top = FitHeight / 2,
                left = (obj.w * FitHeight) / obj.h / 2;
              that.$refs[ele].style.marginTop = `-${top}px`;
              that.$refs[ele].style.marginLeft = `-${left}px`;
            } else {
              console.log(2);
              that.$refs[ele].style.width = `${obj.w}px`;
              that.$refs[ele].style.height = `${obj.h}px`;
              let top = obj.h / 2,
                left = obj.w / 2;
              that.$refs[ele].style.marginTop = `-${top}px`;
              that.$refs[ele].style.marginLeft = `-${left}px`;
            }
          }
          that.$refs[ele].style.display = "block";
        }
      }, url);
    },
    imgLoadEvent(callback, url) {
      //通过URL得到图片的长和高
      var img = new Image();
      img.onreadystatechange = function() {
        if (this.readyState == "complete") {
          callback({ w: img.width, h: img.height });
        }
      };
      img.onload = function() {
        if (this.complete == true) callback({ w: img.width, h: img.height });
      };
      img.onerror = function() {
        callback({ w: 0, h: 0 });
      };
      img.src = url;
    },
    back() {
      this.$router.push({
        path: `/outingRecordManagement/outinRecordList${this.type}`
      });
    },
    getDetail(id) {
      let that = this;
      that.spinning = true;
      that
        .axios({
          url: `${window.baseUrl}/housingrecord/hRecord/findById?id=${id}`,
          method: "post",
          headers: {
            Authorization: "Bearer" + sessionStorage.tokenOrigin
          }
        })
        .then(function(res) {
          that.spinning = false;
          if (res.data.status == 0) {
            res.data.data.backgroundUrl = commInterface.imgUrl(
              res.data.data.backgroundUrl
            );

            res.data.data.url = commInterface.imgUrl(res.data.data.url);
            if (res.data.data.faceUrl) {
              res.data.data.faceUrl = commInterface.imgUrl(
                res.data.data.faceUrl
              );
            }
            that.data = res.data.data;
            that.url = res.data.data.backgroundUrl;
            if (that.data.housingUserId) {
              that.getAddress(
                that.data.housingId,
                that.data.housingUserId,
                that.data.housingUserType
              );
            }
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {});
    },
    getAddress(housingId, housingUserId, housingUserType) {
      let that = this;
      let data = {
        housingId: housingId,
        housingUserId: housingUserId,
        housingUserType: housingUserType
      };
      that
        .axios({
          url: `${
            window.baseUrl
          }/housinguser/housinguser/housingusertype/buildingInf?${util.urlEncode(
            data
          )}`,
          method: "post",
          headers: {
            Authorization: "Bearer" + sessionStorage.tokenOrigin
          }
        })
        .then(function(res) {
          if (res.data.status == 0) {
            that.detailAddress = res.data.data.fullName;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    activeChange(i, url) {
      this.activeFlag = i;
      this.url = url;
    },
    click(str) {
      let next;
      let arr = JSON.parse(sessionStorage.idArr);
      if (str == "prev") {
        if (this.index == 0) {
          return false;
        }
        next = -1;
      } else {
        if (this.index == arr.length - 1) {
          return false;
        }
        next = 1;
      }
      let num = parseInt(this.index) + next;
      this.index = num;
      this.getDetail(arr[num]);
    }
  },
  created() {
    this.arr = JSON.parse(sessionStorage.idArr);
    let params = this.$route.params.id;
    this.id = params.split("_")[0];
    this.index = parseInt(params.split("_")[1]);
    this.$parent.menuTwo = this.$route.meta.title;
    this.type = params.split("_")[2];
    this.getDetail(this.id);
    this.areaAddress = sessionStorage.areaAddress
      ? sessionStorage.areaAddress
      : "";
    console.log(sessionStorage.areaAddress);
  },
  mounted() {}
};
</script>

<style scoped>
@import "../../../static/less/outRecordInfo.css";
@import "../../../static/less/commen.css";
</style>
