<template>
  <div id="app">
    <!-- 路由状态缓存 exclude不包含的意思 -->
    <keep-alive exclude="Detail">
      <!-- vuetify组件的动态效果 -->
      <v-scroll-x-transition>
      <router-view/>
      </v-scroll-x-transition>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'
  export default {
    name:'App',
    components:{
      MainTabBar
    }
  }
</script>

<style>
 @import "assets/css/base.css";
</style>
