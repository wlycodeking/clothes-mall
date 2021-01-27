<template>
  <div class="buy">
    <nav-bar class="nav-bar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="nav_img" />
        </div>
      </template>
      <template v-slot:center>
        <p>确认订单</p>
      </template>
    </nav-bar>
    <scroll class="wrapper">
      <div style="height: 10px"></div>
      <div class="chooseAddress" @click="$router.push('/chooseAddress')">
        <div class="icon">
          <van-icon name="location" color="red" size="40" />
        </div>
        <div class="info" v-if="chooseAddress.length!=0">
          <div class="base_info">
            <div class="name">{{ chooseAddress.consignee }}</div>
            <div class="phoneNum">{{ chooseAddress.phoneNum }}</div>
          </div>
          <div class="address_info">
            {{ chooseAddress.area }} {{ chooseAddress.detAddress }}
          </div>
          <div style="margin-top: 5px; color: red">
            收货不方便时，可选择暂存服务
          </div>
        </div>
        <div v-else>选择收货地址</div>
      </div>
      <div class="goodsList" v-for="(item, index) in goodlist" :key="index">
        <div class="img">
          <img :src="item.image" alt="" />
        </div>
        <div class="good_info">
          <div class="head_info">
            <div class="title">{{ item.title }}</div>
            <div class="price">
              <div>{{ item.price }}</div>
              <div style="text-align:right">x {{ item.count }}</div>
            </div>
          </div>
          <div class="seven">七天无理由退换</div>
          <div class="subtotal">小计： <div class="">￥{{item.count*item.price}}</div> </div>
        </div>
      </div>
      <div style="height:10px"></div>
    </scroll>
    <van-submit-bar :price="totalPrice" button-text="购买" @submit="onSubmit" />
  </div>
</template>


<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import { Toast } from "vant";
import {dateFormat} from "common/tool"

export default {
  name: "Buy",
  components: {
    NavBar,
    Scroll,
  },
  data() {
    return {
      chooseAddress: this.$store.state.chooseAddress,
      goodlist: [],
      totalPrice:'',
    };
  },
  created() {
    for (let i = 0; i < this.$store.state.cartList.length; i++) {
      if (this.$store.state.cartList[i].isCheck == true) {
        this.goodlist.push(this.$store.state.cartList[i]);
      }
    }
    console.log(this.goodlist)
    this.getAllPrice();
  },

  methods: {
    onSubmit(){
      if(this.chooseAddress.length==0){
        Toast.fail('请选择收货地址')
      }
      else{

        let time=dateFormat ( "YYYY-mm-dd HH:MM:SS",new Date())
        this.$store.commit("GetOrder",time);
        Toast.success("购买成功")
        this.$router.push('/home')
      }

    },
    getAllPrice() {
      this.totalPrice= this.$store.getters.getCartCountPrice*100;
      console.log(this.totalPrice);
    }
  },
};
</script>


<style scoped>
.buy {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.nav-bar {
  position: relative;
  background-color: #ff8198;
  color: white;
  font-weight: 500;
  font-size: 20px;
  height: 44px;
}
.wrapper {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.left_icon {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.chooseAddress {
  margin: 0 10px 10px 10px;
  width: calc(100% - 20px);
  border-radius: 13px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.icon {
  margin: 10px;
}
.base_info {
  display: flex;
  align-items: flex-end;
}
.name {
  padding-right: 10px;
  font-size: 18px;
}
.phoneNum {
  color: #8b8b8b;
}
.address_info {
  margin-top: 5px;
}

.goodsList {
  margin: 20px 10px 10px 10px;
  width: calc(100% - 20px);
  border-radius: 13px;
  height: 140px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
}
.img {
  width: 80px;
}
.img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.good_info {
  height: 100px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.head_info {
  display: flex;
}
.title {
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.seven{
  width: 100px;
  margin-left: 10px;
  font-size: 14px;
  color: red;
  background-color: rgba(240, 180, 51, 0.671);
}
.subtotal{
  margin-left: auto;
  display: flex;
  /* font-size: 15px; */
}
</style>