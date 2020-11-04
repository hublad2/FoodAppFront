<template>
  <div class="login-bg-wrapper">
    <div class="login-wrapper">
      <header class="login-wrapper_header">
        Zaloguj się
      </header>
      <section class="login-wrapper_social">
        <button class="social-google" @click="loginGoogle()">
          <img
            src="../assets/btn_google_dark_normal_ios.svg"
            alt="google logo"
          />
          <span>Zaloguj się przez Google</span>
        </button>
        <button class="social-facebook" @click="loginFacebook()">
          <img src="../assets/f_logo_RGB-White_58.png" alt="facebook logo" />
          <span>Zaloguj się przez Facebook</span>
        </button>
      </section>
      <div class="login-wrapper_spacer"><span>lub</span></div>
      <section class="login-wrapper_native">
        <form @submit.prevent>
          <div class="native-input">
            <label class="native-input_label" for="email1">Email</label>
            <input
              class="native-input_input"
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
            />
          </div>
          <div class="native-input">
            <label class="native-input_label" for="password1">Hasło</label>
            <input
              class="native-input_input"
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
            />
          </div>
          <BaseButton @click="login()" :value="'Zaloguj się'" />
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

export default {
  name: "Login",
  components: {
    BaseButton,
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
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
      });
    },
    loginGoogle() {
      this.$store.dispatch("loginGoogle");
    },
    loginFacebook() {
      this.$store.dispatch("loginFacebook");
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
    grid-area: spacer;
    @extend %regular-text;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #000;
    line-height: 0.1em;
    margin: 50px 0 20px;

    span {
      background: $colorBackground2;
      padding: 0 10px;
    }
  }

  &_native {
    grid-area: native;
    button {
      margin: 30px auto 0 auto;
      display: flex;
      justify-content: center;
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

.social-google {
  background-color: #4285f4;
  font-family: "Roboto", sans-serif;
  font-weight: 500;

  span {
    margin: 0 auto;
    color: white;
    font-size: 1.7rem;
  }
}

.social-facebook {
  background-color: #1877f2;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-top: 30px;

  img {
    height: 80%;
    margin-left: 5px;
  }

  span {
    margin: 0 auto;
    color: white;
    font-size: 1.7rem;
  }
}

.native-input {
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  &_label {
    @extend %text-subtle;
    margin-bottom: 3px;
  }

  &_input {
    background: #ffffff;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
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
