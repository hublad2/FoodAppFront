<template>
  <div class="login-bg-wrapper">
    <div class="login-wrapper">
      <header class="login-wrapper_header">
        Zaloguj się
      </header>
      <section class="login-wrapper_social">
        <GoogleLogin />
        <FacebookLogin />
      </section>
      <BaseSpacer class="login-wrapper_spacer" :value="'lub'" />
      <section class="login-wrapper_native">
        <form @submit.prevent>
          <LabeledField
            :label="'Email'"
            :type="'text'"
            :placeholder="'twoj@email.com'"
            :id="'email1'"
            :value="loginForm.email"
            @input.native="(e) => (loginForm.email = e.target.value)"
          />
          <LabeledField
            :label="'Hasło'"
            :type="'password'"
            :placeholder="'******'"
            :id="'password1'"
            :value="loginForm.password"
            @input.native="(e) => (loginForm.password = e.target.value)"
          />
          <BaseButton
            class="button-register"
            @click="login()"
            :value="'Zaloguj się'"
          />
          <ul class="native-extras">
            <li>
              <span>Nie masz konta? </span>
              <router-link to="/register">Zarejestruj się</router-link>
            </li>
            <li>
              <span>Zapomniałeś hasła? </span>
              <a>Odzyskaj hasło</a>
            </li>
          </ul>
        </form>
      </section>
      <div class="login-wrapper_logo">
        <div class="logo">
          <i class="fas fa-egg"></i>
          <h3>Kuchnio Zarządzacz</h3>
        </div>
      </div>
    </div>
    <div class="background-login"></div>
  </div>
</template>

<script>
import BaseButton from "@/components/Button/BaseButton";
import LabeledField from "@/components/Inputs/LabeledField";
import GoogleLogin from "@/components/Button/GoogleLogin";
import FacebookLogin from "@/components/Button/FacebookLogin";
import BaseSpacer from "@/components/Spacer/BaseSpacer";

export default {
  name: "Login",
  components: {
    BaseButton,
    LabeledField,
    GoogleLogin,
    FacebookLogin,
    BaseSpacer,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-bg-wrapper {
  @media screen and (min-width: $tablet) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .background-login {
    @media screen and (min-width: $tablet) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: url("../assets/photo-2.jpeg") no-repeat;
      background-size: cover;
      background-position: center;
      z-index: -1;
      opacity: 0.2;
    }
  }
}

.login-wrapper {
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    "header"
    "social"
    "spacer"
    "native";
  margin: 0 auto;
  min-height: 800px;
  padding: 50px;
  background-color: $colorBackground2;

  @media screen and (min-width: $tablet) {
    grid-template-columns: 500px;
    box-shadow: 0 6px 20px rgba(#0d3320, 0.1);
    min-height: 0;
    padding: 50px;
    border-radius: 8px;
  }

  @media screen and (min-width: $desktop) {
    width: 70%;
    max-width: 1800px;
    display: grid;
    grid-template-columns: 1fr 500px;
    grid-template-areas:
      "logo header"
      "logo social"
      "logo spacer"
      "logo native";
  }

  &_header {
    @extend %heading-1;
    text-align: center;
    grid-area: header;
  }

  &_social {
    grid-area: social;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 110px;

    button {
      display: flex;
      width: 100%;
      border: none;
      padding: 0;
      align-items: center;
      height: 46px;
    }
  }

  &_spacer {
    margin: 50px 0 20px;
  }

  &_native {
    grid-area: native;
    .button-register {
      margin-top: 30px;
      width: 100%;
    }
  }

  &_logo {
    display: none;
    @media screen and (min-width: $desktop) {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-area: logo;
      height: 100%;
      width: 100%;
    }
  }
}

.native-extras {
  @extend %text-subtle;
  margin-top: 3em;

  li {
    margin-top: 1.2em;

    a {
      @extend %button-text;
      text-decoration: underline;
    }
  }
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    @extend %heading-2;
    font-size: 2vw;
    color: rgba(#363837, 1);
  }
  i {
    font-size: 5rem;
    margin-bottom: 0.5em;
    color: $colorPrimary;
  }
}
</style>
