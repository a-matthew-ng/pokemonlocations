<template>
  <section class="loginPage flex-column">
    <img src="../assets/pokeLocationLogo.png" class="loginPage-img" />
    <div class="loginPage-body flex-column">
      <div class="loginPage-body-content flex-column">
        <input v-model="mail" type="mail" placeholder="micorreo@example.com" />
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
</script>
<style lang="scss">
.loginPage {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(../assets/pokeFondo.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  &-img {
    margin-top: -10%;
    width: 34%;
  }
  &-body {
    width: 40%;
    border: 0px;
    border-radius: 10px;
    background-color: #ffffffcd;
    padding: 20px;
    margin-top: -4%;
    &-content {
      width: 100%;
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

@media (max-width: 900px) {
}

@media (max-width: 700px) {
  .loginPage {
    &-img {
      width: 50%;
    }
    &-body {
      width: 90%;
      &-content {
        width: 100%;
      }
    }
  }
}
@media (max-width: 500px) {
  .loginPage {
    &-img {
      width: 90%;
    }
  }
}
</style>
