<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showNotify } from "vant";
import { useRecordStore } from "@/stores/record";
const store = useRecordStore();
const {addUserName}=store;

const username = ref("");
const password = ref("");
const showRegister = ref(false);
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
const onSubmit = (value) => {
  let userInfo = JSON.parse(localStorage.getItem("USERINFO")) || [];
  if (!showRegister.value) {
    userInfo.forEach((u) => {
      if (u.username == value.username) {
        if (u.password == value.password) {
          showNotify({ type: "primary", message: "登录成功" });
          addUserName(value)
          goBack()
        } else {
          password.value = "";
          showNotify({ type: "danger", message: "密码错误" });
        }
      } else {
        showNotify({ type: "warning", message: "用户不存在，去注册" });
        showRegister.value = true;
      }
    });
  } else {
    let a = userInfo.findIndex((t) => t.username == value.username);
    if (a == -1) {
      userInfo.push(value);
      localStorage.setItem("USERINFO", JSON.stringify(userInfo));
      showRegister.value = false;
      showNotify({ type: "success", message: "注册成功" });
    }else{
      username.value=''
       password.value = ""
      showNotify({ type: "warning", message: "用户已存在" });
    }
  }
};
</script>
<template>
  <div class="login">
    <van-notify> </van-notify>
    <div class="head">
      <van-icon name="arrow-left" size="22px" @click="goBack" />
      <span>登录</span>
    </div>
    <div class="box">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            v-show="!showRegister"
          >
            登录
          </van-button>
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            v-show="showRegister"
          >
            注册
          </van-button>
        </div>
      </van-form>
      <div class="register" v-show="!showRegister" @click="showRegister = true">
        没有账号，先注册
      </div>
      <div class="register" v-show="showRegister" @click="showRegister = false">
        登录
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  // display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background-image: url(../assets/img/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 15;
  .head {
    display: flex;
    align-items: center;
    padding: 0 3vw;
    width: 100%;
    height: 45px;
    span {
      margin: auto;
    }
  }
  .box {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    // width: 200px;
    // height: 200px;
    // background-color: red;
    .register {
      margin: auto;
    }
  }
}
</style>