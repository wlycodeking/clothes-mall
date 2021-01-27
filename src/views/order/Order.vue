<template>
  <div class="order">
    <nav-bar class="nav-bar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="nav_img" />
        </div>
      </template>
      <template v-slot:center>
        <p>订单</p>
      </template>
    </nav-bar>
    <scroll class="wraper">
      <!-- <div style="height:10px"></div> -->
    <div class="order_list" v-for="(item, index) in goodlist" :key="index">
      <div class="order_time">订单时间：{{orderTime[index]}}</div>
    <div class="goodsList" >
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
          <div class="subtotal">已付款： <div class="">￥{{item.count*item.price}}</div> </div>
        </div>
      </div>
    </div>
    <div style="height:20px"></div>
    </scroll>
  </div>
</template>


<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "Order",
    components: {
      NavBar,
      Scroll
    },
    data () {
     return {
       goodlist:[],
       orderTime:[],
     }
    },
    created(){
      this.goodlist=this.$store.state.order;
      this.orderTime=this.$store.state.timelist
    },

    methods:{}
  }
</script>


<style scoped>
.order {
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
.wraper{
  height: calc(100% - 49px - 45px);
  overflow: hidden;
}
.left_icon {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.order_list{
margin: 20px 10px 10px 10px;
  width: calc(100% - 20px);
  border-radius: 13px;
  height: 160px;
  background-color: #fff;

  padding: 10px;
}
.order_time{
  padding-bottom: 10px;
  margin-left: 10px;
  text-align: center;
  color: rgb(138, 138, 138);

}
.goodsList {
    display: flex;
  align-items: center;
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