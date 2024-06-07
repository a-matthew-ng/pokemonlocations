<template>
  <section class="loginPage">
    <div class="loginPage-body flex-column">
      <img src="../assets/pokeLocationLogo.png" alt="loginPage-body-img" />
      <div class="loginPage-body-content flex-column">
        <input v-model="mail" type="mail" placeholder="micorreo@exameple.com" />
        <input
          v-model="password"
          :type="statePassword ? 'text' : 'password'"
          placeholder="contraseña"
        />

        <div class="loginPage-body-content-options">
          <button class="primary" type="submit" @click="login()">
            Inicio de sesión
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { loginPoke } from "@/firebase/index.js";
import { ref } from "vue";

var statePassword = false;
var password = ref("");
var mail = ref("");

const login = () => {
  console.log("mail.value, password.value", mail.value, password.value);
  if (password.value !== "" && mail.value !== "") {
    loginPoke(mail.value, password.value);
  } else if (password.value == "" && mail.value !== "") {
    alert("Ingresar Contraseña");
  } else if (mail.value == "" && password.value !== "") {
    alert("Ingresar correo");
  } else if (mail.value == "" && password.value == "") {
    alert("iNGRESAR DATOS");
  }
};
// background-image: url();
</script>
<style lang="scss">
.loginPage {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/pokemon-38.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  &-body {
    width: 500px;
    /* height: 400px; */
    border: 0px;
    border-radius: 5px;
    background-color: #ffffffdc;
    padding: 0px 20px 20px 20px;
    img {
      align-self: center;
      width: 260px;
      margin-top: -8%;
    }
    &-content {
      width: 100%;
      margin-top: -5%;
      &-options {
        margin-top: 10px;
        align-self: center;
        text-align: center;
        p {
          cursor: pointer;
          font-size: 14px;
          margin-top: 7px;
        }
      }
    }
  }
}
</style>
