<template>
  <div class="register">
    <nav-bar class="navbar">
      <template v-slot:left>
        <div @click="$router.go(-1)" class="left_icon">
          <img src="~assets/img/common/back.svg" alt="" class="backicon" />
        </div>
      </template>
      <template v-slot:center>
        <p>注册</p>
      </template>
    </nav-bar>

    <div style="padding: 10px; font-size: 18px">注册账号</div>
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
      <!-- <van-field
        v-model="sms"
        center
        clearable
        label="验证码"
        label-width="60px"
        placeholder="请输入验证码"
        style="font-size: 16px"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field> -->
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
      <van-field
        v-model="nikiname"
        type="nikiname"
        name="nikiname"
        label="昵称"
        placeholder="昵称"
        style="font-size: 16px"
        label-width="60px"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="font-size: 16px;color:#fff"
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
import { Toast } from "vant";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Register",
  components: {
    NavBar,
  },
  data() {
    return {
      users:[],
      username: "",
      password: "",
      nikiname:"",
      sms: "", //验证码
      pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
    }
  },
  methods: {
    onSubmit(values) {
      this.users = 
        {
          username:this.username,
          password:this.password,
          nikiname:this.nikiname
        }
      
      this.$store.commit('Register',this.users)
      // localStorage.setItem("users", JSON.stringify(this.users));
      // console.log(localStorage.getItem("users"));

      


      // this.user=localStorage.getItem("user")
      // localStorage.setItem("username", values.username);
      // localStorage.setItem("password", values.password);
      // localStorage.setItem("nikiname", values.nikiname);
      // console.log(localStorage.getItem("username"));
      // console.log(localStorage.getItem("password"));
      // console.log(localStorage.getItem("nikiname"));
      Toast.success("注册成功");
      this.$router.go(-1);
    },
    validator(val) {
      return val.length >= 9;
      
    },
  },
};
</script>


<style scoped>
.register {
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
.backicon {
  padding-top: 10px;
}
</style>