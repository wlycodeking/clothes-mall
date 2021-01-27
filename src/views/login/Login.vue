<template>
  <div class="login">
    <nav-bar class="navbar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="backicon" />
        </div>
      </template>
      <template v-slot:center>
        <p>登录</p>
      </template>
    </nav-bar>
    <div style="padding: 10px; font-size: 18px">用户登录</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        style="font-size: 16px"
        label-width="60px"
        :rules="[{ pattern, required: true, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        style="font-size: 16px"
        label-width="60px"
        :rules="[{ validator, required: true, message: '请填写至少9位密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="font-size: 16px; color: #fff"
          @submit="onSubmit"
        >
          提交
        </van-button>
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="info"
        style="font-size: 16px"
        @click="$router.push('/register')"
      >
        注册
      </van-button>
    </div>
  </div>
</template>


<script>
import { Toast } from "vant";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      username: "",
      password: "",
      pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("users")));
  },
  methods: {
    onSubmit(values) {
      // let user=[values.username,values.password]
      // localStorage.setItem("user",JSON.stringify(user));
      // console.log(localStorage.getItem("user"));
      const users = JSON.parse(localStorage.getItem("users"))
      for (let i in users) {
        // console.log(i);
        if (values.username == users[i].username && values.password == users[i].password) {
          Toast.success("登录成功");
          this.$router.go(-1);
          this.$store.commit("Login",i);
          console.log(i);
          break;
        } else {
          Toast.fail("账号错误或者密码错误");
        }
      }
      // if (
      //   values.username == JSON.parse(localStorage.getItem("users.username")) &&
      //   values.password == JSON.parse(localStorage.getItem("users.password"))
      // ) {
      //   Toast.success("登录成功");
      //   this.$router.go(-1);
      //   this.$store.commit("Login");
      // } else {
      //   Toast.fail("账号错误或者密码错误");
      // }
    },
    validator(val) {
      return val.length >= 9;
      console.log(val);
    },
  },
};
</script>


<style scoped>
.login {
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
  height: 49px;
}
.left_icon {
  display: flex;
  align-items: center;
  padding-left: 10px;
  /* color: rgb(73, 73, 73); */
}
</style>