<template>
  <div class="cart_list">
    <scroll class="wrapper" ref="scroll">
      <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          <van-swipe-cell>
            <div class="list_item">
              <div class="checkbox">
                <van-checkbox
                  v-model="item.isCheck"
                  checked-color="#e27e90"
                  @click="checkoutClick"
                ></van-checkbox>
              </div>
              <div class="image">
                <img :src="item.image" alt="" />
              </div>
              <div class="content">
                <p class="ellispsis title">{{ item.title }}</p>
                <p class="ellispsis desc">{{ item.desc }}</p>
                <div class="countPrice">
                  <span class="price">￥{{ item.price }}</span>
                  <span class="count">
                    <van-button
                      icon="minus"
                      size="mini"
                      style="margin-right: 10px"
                      @click="deleteGoods(index)"
                    ></van-button>
                    {{ item.count }}
                    <van-button
                      icon="plus"
                      size="mini"
                      style="margin-left: 10px"
                      @click="item.count++"
                    />
                  </span>
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
    </scroll>
    <div class="calcItem">
      <div class="checkbox">
        <van-checkbox
          v-model="allChecked"
          checked-color="#e27e90"
          @click="checkAllClick"
          >全选</van-checkbox
        >
      </div>
      <div class="calc">
        合计：<span>￥{{ getAllPrice }}</span
        >元
      </div>
      <button class="button" @click="handleOrder">
        提交订单({{ $store.getters.getCartLength }})
      </button>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { Toast } from "vant";
export default {
  name: "CartList",
  components: {
    Scroll,
  },
  data() {
    return {
      allChecked: true,
      storeData: this.$store.state.cartList,
    };
  },
  computed: {
    getAllPrice() {
      return this.$store.getters.getCartCountPrice.toFixed(2);
    },
  },
  methods: {
    deleteGoods(index) {
      if (this.storeData[index].count > 1) {
        this.storeData[index].count--;
        console.log(this.$store.state.cartList[index].count);
      } else if (this.storeData[index].count == 1) {
        this.storeData[index].isCheck = false;
        this.storeData[index].count--;
      } else {
        return;
      }
    },
    handleOrder() {
      // this.$toast("暂无此功能");
      if (this.storeData == 0) {
        Toast.fail("购物车没货");
      } else if (this.$store.getters.getCartLength == 0) {
        Toast.fail("没选择商品");
      } else {
        this.$router.push("/buy");
      }
    },
    checkoutClick() {
      let result = this.storeData.filter((item) => {
        return item.isCheck === true;
      });
      if (result.length === this.storeData.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    checkAllClick() {
      if (this.allChecked) {
        this.$store.commit("isCheckTrue");
      } else {
        this.$store.commit("isCheckFalse");
      }
    },
    // 删除商品
    DeleteList(index) {
      this.$store.commit("DeleteList", index);
    },
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang="scss" scoped>
.delete-button {
  height: 100%;
}
.cart_list {
  padding-top: 44px;
  width: 100%;
  overflow: hidden;
  height: calc(100% - 54px);
  .wrapper {
    height: calc(100% - 50px);
    // padding: 0 10px;
    overflow: hidden;
    .list_item {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .checkbox {
        position: relative;
        text-align: center;
        margin-top: 40px;
        margin-right: 10px;
        margin-left: 10px;
      }
      .image {
        width: 80px;
        img {
          width: 80px;
          height: 100px;
          border-radius: 5px;
          object-fit: cover;
        }
      }
      .content {
        position: relative;
        flex: 1;
        width: 67%;
        padding-left: 15px;
        padding-right: 10px;
        .title {
          color: #333;
          font-size: 16px;
          padding-bottom: 15px;
        }
        .desc {
          color: #666;
          font-size: 14px;
        }
        .countPrice {
          display: flex;
          justify-content: space-between;
          position: relative;
          align-items: center;
          bottom: -25px;
          .price {
            color: #ff4500;
            font-size: 18px;
          }
          .count {
            font-size: 20px;
            color: #333333;
            padding-right: 10px;
            display: flex;
            // height: ;
            // height: 23px;
            // line-height: 23px;
          }
        }
      }
    }
  }
  .ellispsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .calcItem {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 9;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cccc;
    border-bottom: 1px solid #cccccc;
    .checkbox {
      padding-left: 10px;
      font-size: 16px;
    }
    .calc {
      font-size: 15px;
      color: #333333;
      position: relative;
      top: -2px;
      span {
        color: #ff3d69;
        font-weight: 700;
        padding-right: 5px;
      }
    }
    .button {
      border: none;
      background-color: #ff3d69;
      padding: 15px 15px;
      overflow: hidden;
      color: #eeeeee;
    }
  }
}
</style>
