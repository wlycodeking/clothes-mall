import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from "./mutations";
import actions from './actions'
import getters from "./getters";
const state = {
  cartList:[],
  choseCount:0,
  loginStatus:false,
  address:[],
  chooseAddress:[],
  order:[],
  timelist:[],
  users:[],//注册的用户
  usersIndex:0,//已注册用户的下标
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
