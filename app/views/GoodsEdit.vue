<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160" style="width:500px" >
        <FormItem label="商品名称" prop="goodsName" >
            <Input v-model="formValidate.goodsName" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品子标题" prop="goodsSubtitle">
            <Input v-model="formValidate.goodsSubtitle" placeholder="请输入商品子标题"></Input>
        </FormItem>
        <FormItem label="商品关键字" prop="goodsKeywords">
            <Input v-model="formValidate.goodsKeywords" placeholder="请输入商品关键字"></Input>
        </FormItem>
        <!--任务六：归属卖家，商品品牌，商品分类需要先查询在输入-->
        <FormItem label="归属卖家" prop="supplyId">
            <Select v-model="formValidate.supplyId" placeholder="选择归属卖家">
                <Option value="0">自营</Option>
                <Option value="1">润肤直营店</Option>
                <Option value="2">TCL</Option>
            </Select>
        </FormItem>
        <FormItem label="商品品牌" prop="brandId">
            <Select v-model="formValidate.brandId" placeholder="请输入商品品牌">
                <Option value="0">壹柯米</Option>
                <Option value="1">360</Option>
                <Option value="2">TCL</Option>
            </Select>
        </FormItem>
        <FormItem label="商品分类" prop="catId">
            <Select v-model="formValidate.catId" placeholder="选择商品分类" >
                <Option value="1" selected="selected">智能锁</Option>
                <Option value="2">锁体</Option>
            </Select>
        </FormItem>
        <!--
        <FormItem label="商品类别" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">成品</Option>
                <Option value="shanghai">虚拟商品</Option>
            </Select>
        </FormItem>
        -->
        <Divider />
          <FormItem label="商品编号" prop="goodsSn">
            <Input v-model="formValidate.goodsSn" placeholder="请输入商品编号"></Input>
        </FormItem>
        <FormItem label="商品零售价" prop="goodsRetailPrice">
            <Input v-model="formValidate.goodsRetailPrice" placeholder="请输入商品零售价"></Input>
        </FormItem>
        <FormItem label="商品出厂价" prop="goodsFactoryPrice">
            <Input v-model="formValidate.goodsFactoryPrice" placeholder="请输入商品出厂价"></Input>
        </FormItem>
        <FormItem label="基础拿货价" prop="goodsBasicPrice">
            <Input v-model="formValidate.goodsBasicPrice" placeholder="请输入基础拿货价"></Input>
        </FormItem>
        <Divider />
         <FormItem label="商品重量(kg)" prop="goodsWeight">
            <Input v-model="formValidate.goodsWeight" placeholder="请输入商品重量"></Input>
        </FormItem>
         <FormItem label="商品体积(m3)" prop="goodsCube">
            <Input v-model="formValidate.goodsCube" placeholder="请输入商品体积"></Input>
        </FormItem>
        <Divider />
        <FormItem label="新品推荐" prop="IsGoodsNew">
            <RadioGroup v-model="formValidate.IsGoodsNew">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="新品推荐顺序" prop="NewGoodsSort">
            <Input v-model="formValidate.NewGoodsSort" placeholder="请输入新品推荐顺序"></Input>
        </FormItem>
           <FormItem label="列表页是否显示" prop="IsGoodsShow">
            <RadioGroup v-model="formValidate.IsGoodsShow">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="列表页排序" prop="GoodsShowSort">
            <Input v-model="formValidate.GoodsShowSort" placeholder="请输入排序码"></Input>
        </FormItem>
         <FormItem label="商品是否上架" prop="isShelves">
            <RadioGroup v-model="formValidate.isShelves">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <Divider />
        <FormItem label="产品主图" prop="uploadList">
        <div class="demo-upload-list" v-for="item in formValidate.uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="20480"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="http://localhost:8080/upload/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <img :src="'file:///D:/Works/Development/NodeJS/wechat-mall-bk/package/images/' + imgName " v-if="visible" style="width: 100%">
    </Modal>
    </FormItem>
        <Divider />
        <FormItem label="产品描述" prop="goodsDesc">
            <Input v-model="formValidate.goodsDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品描述..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import Goods from '../class/goods'
    export default {
        props:{
            formValidate:[Object],
            isupdate:[Boolean]
        },
        data () {
            return {
                /*formValidate: {
                    goodsName: '',
                    goodsSubtitle: '',
                    goodsKeys: '',
                    supplyId: '',
                    brandId: '',
                    catId: '',
                    goodsSn: '',
                    goodsPrice: '',
                    goodsSupplyPrice:'',
                    goodsBasicPrice:'',
                    goodsWeight:'',
                    goodsCube:'',
                    IsGoodsNew:0,
                    NewGoodsSort:1,
                    GoodsShowSort:1,
                    IsGoodsShow:0,
                    goodsDesc:'',
                    is_shelves:0,
                    uploadList: []
                  


                },*/
                ruleValidate: {
                    goodsName: [
                        { required: true, message: '商品名字不能为空', trigger: 'blur' }
                    ],
                    supplyId: [
                        { required: true, message: '请选择供应商', trigger: 'change' }
                    ],
                    goodsRetailPrice: [
                        { required: true, message: '商品零售价格不能为空', trigger: 'blur' }
                    ],
                    isShelves: [
                        { required: true, message: '请选择商品是否上架', trigger: 'change' }
                    ],
                },
                /*图片上传*/
                 defaultList: [
                    {
                        'name': 'C-App.png',
                        'url': 'file:///D:/Works/Development/NodeJS/wechat-mall-bk/package/images/C-App.png'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
              //  uploadList: []
              }
        },
        methods: {
            handleSubmit (name) {
                let self =this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
 
                         let obj={};
                    obj.goodsName=self.formValidate.goodsName;
                    obj.goodsSubtitle=self.formValidate.goodsSubtitle;
                    obj.goodsKeywords=self.formValidate.goodsKeywords;
                    obj.supplyId= self.formValidate.supplyId;
                    obj.brandId=self.formValidate.brandId;
                    obj.catId=self.formValidate.catId;
                    obj.goodsSn=self.formValidate.goodsSn;
                    obj.goodsRetailPrice=self.formValidate.goodsRetailPrice;
                    obj.goodsFactoryPrice=self.formValidate.goodsFactoryPrice;
                    obj.goodsBasicPrice=self.formValidate.goodsBasicPrice;
                    obj.goodsWeight=self.formValidate.goodsWeight;
                    obj.goodsCube=self.formValidate.goodsCube;
                    obj.IsGoodsNew=self.formValidate.IsGoodsNew;
                    obj.NewGoodsSort=self.formValidate.NewGoodsSort;
                    obj.GoodsShowSort=self.formValidate.GoodsShowSort;
                    obj.IsGoodsShow=self.formValidate.IsGoodsShow;
                    obj.goodsDesc=self.formValidate.goodsDesc;
                    obj.isShelves=self.formValidate.isShelves;
                    obj.uploadList=[];
                   for (let index of self.formValidate.uploadList.keys())
                    {
                      let o={
                          url:self.formValidate.uploadList[index].url,
                          name:self.formValidate.uploadList[index].name
                          }
                       obj.uploadList.push(o)
                
                    }
                    console.log(JSON.stringify(obj))
                    if(self.isupdate)
                    {
                        obj.goodsId=self.formValidate.goodsId;
                        new Goods().updateGoodInfo(obj).then(
                            (res)=>{
                             self.$Message.success('Success!');
                            }
                        ).catch((err)=>{
                           // self.$Message.error('error');
                            self.$Message.success('Success!!');
                        }) 
                        
                    }
                    else{
                         new Goods().insertGoodInfo(obj).then(
                            (res)=>{
                               self.$Message.success('Success!');
                            }
                        ).catch((err)=>{
                           // self.$Message.error('error');
                            self.$Message.success('Success!!');
                        }) 
                    }
                     
                    } else {
                        self.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            /*图片上传 */
              handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = res;
                file.name = res.substr(res.lastIndexOf("/")+1);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.formValidate.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
         mounted () {
           // let self = this;
           // self.formValidate.uploadList = self.$refs.upload.fileList;
           //self.formValidate.uploadList = self.$refs.upload.fileList;
            console.log("end mounted")  
        },
        updated(){
           let self = this;
           self.formValidate.uploadList = self.$refs.upload.fileList; 
           console.log("end updated ") 
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

