<template>
  <div class="address">
    <nav-bar class="navbar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="backicon" />
        </div>
      </template>
      <template v-slot:center>
        <p>我的收货地址</p>
      </template>
      
    </nav-bar>
    <scroll class="wrapper" ref="scroll">
      <ul>
        <li v-for="(item, index) in $store.state.address" :key="index" class="address_item">
<van-swipe-cell>
            <div class="list_item">
              <van-icon name="wap-home-o" size="30px"/>
              <div class="info">
                <div class="base_info">
                  <div class="name">{{item.consignee}}</div>
                  <div class="phoneNum">{{item.phoneNum}}</div>
                </div>
                <div class="address_info">
                  {{item.area}} {{item.detAddress}}

                </div>
              </div>
             
            </div>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="DeleteList(index)"
              />
            </template>
          </van-swipe-cell>
        </li>
      </ul>
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <van-button round type="info" block style="font-size:16px" @click="$router.push('/addAddress')">添加地址</van-button>
      </div>
    </scroll>
  </div>
</template>


<script>
import NavBar from "components/common/navbar/NavBar";

import Scroll from "components/common/scroll/Scroll";

import Area from "common/area"
export default {
  name: "Address",
  components: {
    NavBar,
    Scroll
 
  },
  data() {
    return {
         // address:this.$store.state.address
    };
  },
  methods: {
    DeleteList(index){
      this.$store.commit('DeleteAddress',index);
    }
  },
};
</script>


<style lang="scss" scoped>
.address {
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
.right_icon{
  margin-left: auto;
    display: flex;
  align-items: center;
  padding-right: 10px;
}

// .address_item{
//   padding-left:10px;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 80px;
//   background-color: #fff;

// }
.list_item{
  padding-left: 10px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.info{
  padding-left: 10px;
  // height: 100%;
}
.base_info{
  display: flex;
  align-items: flex-end;
  height: 30px;
}
.name{
  // width: 100px;
  padding-right: 10px;
  font-size: 18px;
}
.phoneNum{
  color: #8b8b8b;
}
.address_info{
  margin-top: 5px;
  // display: flex;
  

}

.delete-button {
  height: 100%;
}
</style>