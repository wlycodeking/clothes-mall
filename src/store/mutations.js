import { Toast } from "vant";
export default {
  pushCart(state,payload){
    payload.count = state.choseCount
    payload.isCheck = true
    let new_payload = JSON.parse(JSON.stringify(payload))
    Toast({
      type: "success",
      message: `添加商品成功`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    });
    state.cartList.push(new_payload)
  },
  incrementCount(state,payload){
    payload.count += state.choseCount
    Toast({
      type: "success",
      message: `当前商品数量为${payload.count}`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    });
  },
  isCheckTrue(state){
    for(let i of state.cartList){
      i.isCheck = true
    }
  },
  isCheckFalse(state){
    for(let i of state.cartList){
      i.isCheck = !i.isCheck
    }
  },
  //添加商品数量
  addCount(state,choseCount){
    state.choseCount=choseCount
  },
  // 登录状态
  Login(state,index){
    state.loginStatus=true;
    state.usersIndex = index
  },
  // 删除商品
  DeleteList(state,index){
    state.cartList.splice(index,1);
  },
  // 添加地址
  addAddress(state,values){
    state.address.push(values);
    Toast({
      type: "success",
      message: '添加成功',
      
    });
    state.chooseAddress=state.address[0]
  },
  //删除地址
  DeleteAddress(state,index){
    state.address.splice(index,1)
  },
  // 选择地址
  ChooseAdd(state,index){
    state.chooseAddress=state.address[index];
  
  },
  // 得到订单数据
  GetOrder(state,time){
    for (let i = 0; i < state.cartList.length; i++) {
      if (state.cartList[i].isCheck == true) {
        // let orderlist=[]
        state.order.push(state.cartList[i]);
        state.cartList.splice(i,1)
        i--
        state.timelist.push(time)
      }
    }
  },
  // 注册用户
  Register(state,users){
    if(localStorage.getItem("users")){
      state.users = JSON.parse(localStorage.getItem("users")) 
    }
    // state.users.push(localStorage.getItem("users"))
    state.users.push(users)
    localStorage.setItem("users", JSON.stringify(state.users));
      console.log(localStorage.getItem("users"));


  }
}
