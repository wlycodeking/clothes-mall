<template>
  <div class="add_address">
    <nav-bar class="navbar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="backicon" />
        </div>
      </template>
      <template v-slot:center>
        <p>添加地址</p>
      </template>
    </nav-bar>
    <!-- <div style="padding: 10px; font-size: 18px">123</div> -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="consignee"
        name="consignee"
        label="收货人"
        placeholder="收货人"
        style="font-size: 16px"
        label-width="80px"
        :rules="[{ validator,required: true, message: '请输入2-9位' }]"
      />
      <van-field
        v-model="phoneNum"
        type="phoneNum"
        name="phoneNum"
        label="手机号"
        placeholder="手机号"
        style="font-size: 16px"
        label-width="80px"
        :rules="[{ pattern, required: true, message: '' }]"
      />
      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="地区选择"
        style="font-size: 16px"
        label-width="80px"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="detAddress"
        type="textarea"
        name="detAddress"
        label="详细地址"
        placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
        style="font-size: 16px"
        label-width="80px"
        :rules="[{  required: true, message: '' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="font-size: 16px; color: #fff"
          @submit="onSubmit"
        >
          提交
        </van-button>
      </div>
    </van-form>
    
  </div>
</template>


<script>
import { Toast } from "vant";
import NavBar from "components/common/navbar/NavBar";
import Area from "common/area"
export default {
  name: "addAddress",
  components: {
    NavBar,
  },
  data() {
    return {
      consignee: "",//收货人
      phoneNum: "",//手机号
      pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      value: '',//地区选择
      showArea: false,
      areaList: Area,//地区选择
      detAddress:''
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$store.commit("addAddress",values)
      Toast.success('地址添加成功')
      this.$router.go(-1)
    },
    onConfirm(values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
    validator(val){
      return val.length<=9&&val.length>=2
      console.log(val);
    },
   
  },
};
</script>


<style scoped>
.add_address {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.navbar {
  position: relative;
    background-color: #ff8198;
    color: white;
    font-weight: 500;
    font-size: 20px;
    height: 44px;
}
.left_icon{
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>