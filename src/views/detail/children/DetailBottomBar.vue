<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" dot color="#07c160"/>
    <van-goods-action-icon icon="cart-o" text="购物车"  :badge="length" @click="RouterCar"/>
    <van-goods-action-icon icon="star-o" text="收藏"  v-show="unstar" @click="unstar=false"/>
    <van-goods-action-icon icon="star" text="收藏"  v-show="!unstar" @click="unstar=true" color="#d81e06"/>
    <van-goods-action-button type="warning" text="加入购物车" color="#EB989E" @click="addCart"/>
    <van-goods-action-button type="danger" text="立即购买" color="#ff5777" @click="buy"/>
  </van-goods-action>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "DetailBottomBar",
    
    computed:{
      ...mapGetters(['getCartLength'])
    },
    data(){
      return {
        unstar:true,
        length:this.$store.getters.getCartLength
      }
    },
    watch:{
      getCartLength(value){
        this.length = value
      }
    },
    methods:{
      RouterCar(){
        this.$router.push('/cart')
      },
      addCart(){
        this.$emit('addCart')
      },
      buy(){
        this.$emit('buy')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
