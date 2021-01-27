<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar :titles="titles" @itemClick="itemClick" ref="nav_bar" />
    <scroll
      class="scroll"
      ref="scroll"
      :whatProbeType="3"
      @scrollPositon="scrollPositon"
      @showBackTop="showBackTop"
    >
      <template v-slot:default>
        <!--轮播图-->
        <detail-swiper :top-images="topImages" />
        <!--基本信息-->
        <detail-base-info :base-data="baseData" />
        <!--店铺信息-->
        <detail-shop-info :shop-info="shopInfo" />
        <!--穿着效果-->
        <detai-dress-info :detail-info="detailInfo" @imgLoad="imgLoad" />
        <!--尺码标准-->
        <detail-item-params :item-params="itemParams" ref="itemParams" />
        <!--评论信息-->
        <detail-comment-info :rate="rate" ref="comment" />
        <!--推荐商品-->
        <div ref="recommend">
          <p class="recommend">推荐商品</p>
          <goods-list :goods="recommended" />
        </div>
      </template>
    </scroll>
    <van-sku
      v-model="showBase"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
      :quota="skuData.quota"
      :quota-used="skuData.quota_used"
      :initial-sku="initialSku"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      disable-stepper-input
      :close-on-click-overlay="closeOnClickOverlay"
      :custom-sku-validator="customSkuValidator"
      ref="vansku"
      @buy-clicked="onBuyClicked"
      @add-cart="addCart"
    />
    <!--返回顶部按钮-->
    <back-top @click.native="scrollTop" v-show="isShopBackTop" />
    <!--底部-->
    <detail-bottom-bar @addCart="showBase = true" @buy="Buy"/>
  </div>
</template>

<script>
import skuData from "./data";

import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "./children/DetailSwiper";
import DetailBaseInfo from "./children/DetailBaseInfo";
import DetailShopInfo from "./children/DetailShopInfo";
import DetaiDressInfo from "./children/DetaiDressInfo";
import DetailItemParams from "./children/DetailItemParams";
import DetailCommentInfo from "./children/DetailCommentInfo";
import DetailBottomBar from "./children/DetailBottomBar";
import {
  getDetailData,
  GetDeatilBaseData,
  GetDetailShopInfo,
  GetItemParams,
  getRecommentdData,
} from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { imgMixin, backTopMixin } from "common/mixin";
import { Toast } from 'vant';
export default {
  name: "Detail",
  components: {
    GoodsList,
    DetailShopInfo,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetaiDressInfo,
    DetailItemParams,
    Scroll,
    DetailCommentInfo,
    DetailBottomBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      //轮播图照片
      topImages: [],
      baseData: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      rate: {},
      recommended: [],
      offsetTopY: [],
      currentIndex: 0,
      iid: 0,

      // sku
      skuData: skuData,
      showBase: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      initialSku: {
        //默认选中
        s1: "1",
        s2: "100",
        selectedNum: 1,
      },
      customSkuValidator: () => "请选择参数!",
    };
  },
  mixins: [imgMixin, backTopMixin],
  created() {
    getDetailData(this.$route.params.iid).then((res) => {
      this.iid = res.iid;
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.baseData = new GetDeatilBaseData(
        data.itemInfo,
        data.columns,
        data.shopInfo
      );
      this.shopInfo = new GetDetailShopInfo(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = data.itemParams
        ? new GetItemParams(data.itemParams)
        : {};
      this.rate = data.rate.list ? data.rate.list[0] : {};
    });
    //获取推荐信息
    getRecommentdData().then((res) => {
      this.recommended = res.data.list;
    });
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      this.offsetTopY.push(0);
      this.offsetTopY.push(this.$refs.itemParams.$el.offsetTop);
      this.offsetTopY.push(this.$refs.comment.$el.offsetTop);
      this.offsetTopY.push(this.$refs.recommend.offsetTop);
      this.offsetTopY.push(Number.MAX_VALUE);
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.offsetTopY[index], 500);
    },
    scrollPositon(position) {
      let positionY = -position.y;
      for (let i = 0; i < this.offsetTopY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.offsetTopY[i] &&
          positionY < this.offsetTopY[i + 1]
        ) {
          this.currentIndex = i;
        }
      }
      this.$refs.nav_bar.currentIndex = this.currentIndex;
    },
    addCart() {
      if(this.$store.state.loginStatus!=false){

        const cartListData = {
          title: this.baseData.title,
          desc: this.baseData.desc,
          iid: this.iid,
          image: this.topImages[0],
          price: this.baseData.lowNowPrice,
          
        };
        const choseCount=this.$refs.vansku.getSkuData().selectedNum;
         this.$store.commit("addCount", choseCount);
        console.log(cartListData.choseCount);
        this.$store.dispatch("addCart", cartListData);
      }
      else{
        Toast.fail('请登录，才可以添加购物车');
        this.$router.push('/login')
      }
    },
    Buy(){
      if(this.$store.state.loginStatus!=false){

        const cartListData = {
          title: this.baseData.title,
          desc: this.baseData.desc,
          iid: this.iid,
          image: this.topImages[0],
          price: this.baseData.lowNowPrice,
          
        };
        const choseCount=this.$refs.vansku.getSkuData().selectedNum;
         this.$store.commit("addCount", choseCount);
        console.log(cartListData.choseCount);
        this.$store.dispatch("addCart", cartListData);
         this.$router.push('/cart')
      }
      else{
        Toast.fail('请登录，才可以添加购物车');
        this.$router.push('/login')
      }
    },

      // sku
    onAddCartClicked(data) {
      //加入购物车
      this.$toast("add cart:" + JSON.stringify(data));
    },

    onBuyClicked(data) {
      this.Buy()
      console.log(data);
      console.log(JSON.stringify(data));
    },
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.imgListener);
  },
};
</script>

<style lang="scss" scoped>
#detail {
  position: relative;
  height: 100%;
  z-index: 19;
  background-color: #fff;
  overflow: hidden;
  .scroll {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
  }
  .recommend {
    padding: 8px;
  }
}
</style>
