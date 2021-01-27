<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" class="recommend" :key="index">

        <img :src="item.image" alt="">

      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
 .recommends{
  //  position: relative;
   display: flex;
   text-align: center;
   border-bottom: 8px solid #eee;
   .recommend{
     margin: 12px 0;
     flex: 1;
     img {
       width: 70px;
       height: 70px;
     }
     div {
       padding-top: 5px;
     }
   }
 }
</style>
