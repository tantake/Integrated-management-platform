//菜单列表
const getMenu = function (that) {
  return new Promise(function (resolve) {
    that.axios({
      url: `${window.baseUrl}/sysuser/sys/menu/nav?access_token=${sessionStorage.tokenOrigin}`,
      method: 'get'
    }).then(function (res) {
      that.loading = false;
      if (res.data.status == 0) {
        resolve(res.data);
      } else {
        that.$message.error(res.data.msg);
      }
    }).catch(function (e) {
      console.log(e);
    })
  });
};

// 小区列表
const getArea = function (that) {
  return new Promise(function (resolve) {
    that.axios({
      url: `${window.baseUrl}/housinguser/housinguser/housingestate/list?access_token=${sessionStorage.tokenOrigin}`,
      method: 'get'
    }).then(function (res) {

      if (res.data.status == 0) {
        resolve(res.data);
      } else {
        that.$message.error(res.data.msg);
      }
    }).catch(function (e) {
      console.log(e);
    })
  });
}
//分页获取小区列表
const getAreaByPage = function (that, data) {
  return new Promise(function (resolve) {
    that.axios({
      url: `${window.baseUrl}/housinguser/housinguser/housingestate/page`,
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + sessionStorage.tokenOrigin
      }
    }).then(function (res) {
      that.loading = false;
      if (res.data.status == 0) {
        console.log(res);

        resolve(res.data);
      } else {
        that.$message.error(res.data.msg);
      }
    }).catch(function (e) {
      console.log(e);
    })
  });
}

//楼栋
const getBuilding = function (that, data) {

  return new Promise(function (resolve) {
    that.axios({
      url: `${window.baseUrl}/housinguser/housinguser/building/list?${data}&access_token=${sessionStorage.tokenOrigin}`,
      method: 'post'
    }).then(function (res) {
      if (res.data.status == 0) {
        resolve(res.data);
      } else {
        that.$message.error(res.data.msg);
      }
    }).catch(function (e) {
      console.log(e);
    })
  });
}
// 部门列表
const getDept = function (that) {
  return new Promise(function (resolve) {
    that.axios({
      url: `${window.baseUrl}/sysuser/sys/dept/tree?access_token=${sessionStorage.tokenOrigin}`,
      method: 'get'
    }).then(function (res) {
      if (res.data.status == 0) {
        resolve(res.data);
      } else {
        that.$message.error(res.data.msg);
      }
    }).catch(function (e) {
      console.log(e);
    })
  });
}
const formatTreeArray = function (list, name, key) {
  const arr = [];
  let obj = {};
  for (let i in list) {
    const tmp = list[i];
    if (tmp.childList && tmp.childList.length > 0) {
      tmp.childList = formatTreeArray(tmp.childList, name, key);
      obj = {
        title: tmp[name],
        key: tmp[key] + '',
        children: tmp.childList,
        value: tmp[key] + '',
        item: tmp
      }
    } else {
      obj = {
        title: tmp[name],
        key: tmp[key] + '',
        value: tmp[key] + '',
        item: tmp
      }
    }
    arr.push(obj);
  }
  return arr;
}

const formatCascader = function (list, name, key) {
  const arr = [];
  let obj = {};
  for (let i in list) {
    const tmp = list[i];
    if (tmp.childList && tmp.childList.length > 0) {
      tmp.childList = formatCascader(tmp.childList, name, key);
      obj = {
        label: tmp[name],
        value: tmp[key],
        children: tmp.childList,
        item: tmp,
        index: i
      }
    } else {
      obj = {
        label: tmp[name],
        value: tmp[key],
        item: tmp,
        index: i
      }
    }
    arr.push(obj);
  }
  return arr;
}
//证件号
const credentials = [
  { name: "居民身份证", value: "1" },
  { name: "临时身份证", value: "2" },
  { name: "户口簿", value: "3" },
  { name: "军官证", value: "4" },
  { name: "警官证", value: "5" },
  { name: "外交护照", value: "6" },
  { name: "大陆通行证", value: "7" }
]
//民族
const nation = [{ id: "01", name: "汉族" },
{ id: "02", name: "蒙古族	" },
{ id: "03", name: "回族	" },
{ id: "04", name: "藏族" },
{ id: "05", name: "维吾尔族" },
{ id: "06", name: "苗族" },
{ id: "07", name: "彝族" },
{ id: "08", name: "壮族" },
{ id: "09", name: "布依族" },
{ id: "10", name: "朝鲜族" },
{ id: "11", name: "满族" },
{ id: "12", name: "侗族" },
{ id: "13", name: "瑶族" },
{ id: "14", name: "白族" },
{ id: "15", name: "土家族" },
{ id: "16", name: "哈尼族" },
{ id: "17", name: "哈萨克族" },
{ id: "18", name: "傣族" },
{ id: "19", name: "黎族" },
{ id: "20", name: "傈僳族" },
{ id: "21", name: "佤族" },
{ id: "22", name: "畲族" },
{ id: "23", name: "高山族" },
{ id: "24", name: "拉祜族" },
{ id: "25", name: "水族" },
{ id: "26", name: "东乡族" },
{ id: "27", name: "纳西族" },
{ id: "28", name: "景颇族" },
{ id: "29", name: "柯尔克孜族" },
{ id: "30", name: "土族" },
{ id: "31", name: "达斡尔族" },
{ id: "32", name: "仫佬族" },
{ id: "33", name: "羌族" },
{ id: "34", name: "布朗族" },
{ id: "35", name: "撒拉族" },
{ id: "36", name: "毛南族" },
{ id: "37", name: "仡佬族" },
{ id: "38", name: "锡伯族" },
{ id: "39", name: "阿昌族" },
{ id: "40", name: "普米族" },
{ id: "41", name: "塔吉克族" },
{ id: "42", name: "怒族" },
{ id: "43", name: "乌孜别克族" },
{ id: "44", name: "俄罗斯族" },
{ id: "45", name: "鄂温克族" },
{ id: "46", name: "德昂族" },
{ id: "47", name: "保安族" },
{ id: "48", name: "裕固族" },
{ id: "49", name: "京族" },
{ id: "50", name: "塔塔尔族" },
{ id: "51", name: "独龙族" },
{ id: "52", name: "鄂伦春族" },
{ id: "53", name: "赫哲族" },
{ id: "54", name: "门巴族" },
{ id: "55", name: "珞巴族" },
{ id: "56", name: "基诺族" },
{ id: "60", name: "不详" },
{ id: "91", name: "外籍人员" },
{ id: "92", name: "无国籍人员" },
{ id: "97", name: "其他" },
{ id: "98", name: "外国血统" },
{ id: "99", name: "中国籍人士" }];
//现实状况
const employment = [{
  name: '个体',
  value: '2'
}, {
  name: '在家居住',
  value: '4'
},
{
  name: '就业',
  value: '1'
},
{
  name: '就学',
  value: '3'
}, {
  name: '自由职业',
  value: '5'
}
];
const dataSources = [{
  name: '小程序新增',
  value: 1
},
{
  name: '小程序帮家人开通',
  value: 2
},

{
  name: '帮家人开通(物业管理系统)',
  value: 4
},
{
  name: '管理员开通(物业管理系统)',
  value: 5
}]

const housingUserType = [{
  name: '业主',
  value: '1'
},
{
  name: '租客',
  value: '2'
}]
const userType = [
  { name: "业主", value: 1 },
  { name: "租客", value: 2 },
  { name: "物业", value: 3 },
  { name: "陌生人", value: 4 },
  { name: "装修人员", value: 5 },
  { name: "外卖人员", value: 6 },
  { name: "快递人员", value: 7 },
  { name: "访客", value: 8 },
];
const sex = [
  { name: '全部', value: '' },
  { name: "男", value: 1 },
  { name: "女", value: 0 },
];
const pageSizeOptions = ['10', '20', '30', '40'];
const uploadAvatar = function (data, that) {
  return new Promise(function (resolve) {
    that.axios({
      url: `${window.imgUploadUrl}/storage/face/addUserImage`,
      method: 'POST',
      data: data,
      headers: {
        'Authorization': 'Bearer' + sessionStorage.tokenOrigin
      }
    }).then(function (res) {
      that.uploadAvatarLoading = false;
      if (res.data.status == 0) {
        resolve(res.data)
      } else {

        that.$message.error(res.data.msg);
      }
    }).catch(function (err) {
      error(that, err.message)
    })
  });

};
const imgUrl = function (url) {
  return `${window.imgUploadUrl}${url}?access_token=${sessionStorage.tokenOrigin}`
}
export default {
  getMenu,
  getArea,
  getDept,
  formatTreeArray,
  formatCascader,
  getBuilding,
  nation,
  credentials,
  employment,
  housingUserType,
  userType,
  sex,
  pageSizeOptions,
  uploadAvatar,//上传头像
  imgUrl,
  getAreaByPage,
  dataSources
};

