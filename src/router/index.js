import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>  import ('views/home/Home')
const Category = () =>  import ('views/category/Category')
const Cart = () =>  import ('views/cart/Cart')
const Profile = () =>  import ('views/profile/Profile')
const Detail = () =>  import ('views/detail/Detail')
const Login = () =>  import ('views/login/Login')
const Register = () =>  import ('views/login/Register')
const Buy = () =>  import ('views/buy/Buy')
const Address = () =>  import ('views/address/Address')
const addAddress = () =>  import ('views/address/addAddress')
const chooseAddress = () =>  import ('views/address/chooseAddress')
const Order = () =>  import ('views/order/Order')


Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/category',component:Category},
    {path:'/cart',component:Cart},
    {path:'/profile',component:Profile},
    {path:'/detail/:iid',component:Detail},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/buy',component:Buy},
    {path:'/address',component:Address},
    {path:'/addAddress',component:addAddress},
    {path:'/chooseAddress',component:chooseAddress},
    {path:'/order',component:Order},
  ]

const router = new VueRouter({
  routes ,
  mode:'history'
})

export default router
