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
          <span>Login with Google</span>
        </button>
        <button class="social-facebook" @click="loginFacebook()">
          <img src="../assets/f_logo_RGB-White_58.png" alt="facebook logo" />
          <span>Login with Facebook</span>
        </button>
      </section>
      <div class="login-wrapper_spacer"><span>lub</span></div>
      <section class="login-wrapper_native">
        <form @submit.prevent>
          <div class="native-input">
            <label class="native-input_label" for="email1">Email:</label>
            <input
              class="native-input_input"
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
            />
          </div>
          <div class="native-input">
            <label class="native-input_label" for="password1">Hasło:</label>
            <input
              class="native-input_input"
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
            />
          </div>
          <button @click="login()" class="button">Zaloguj się</button>
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
    </div>
    <div class="background-login"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.login-bg-wrapper {
  @media screen and (min-width: 750px) {
    display: flex;
    height: 100vh;
  }

  .background-login {
    @media screen and (min-width: 750px) {
      flex: 1;
      background-color: $colorBackground3;
    }
  }
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;

  @media screen and (min-width: 750px) {
    width: 450px;
    margin: 0 50px;
  }

  &_header {
    @extend %header-text;
  }

  &_social {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 110px;
  }

  button {
    display: flex;
    width: 100%;
    border: none;
    padding: 0;
    align-items: center;
    height: 46px;
  }

  &_spacer {
    @extend %regular-text;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #000;
    line-height: 0.1em;
    margin: 50px 0 20px;

    span {
      background: $colorBackground1;
      padding: 0 10px;
    }
  }

  &_native {
    button {
      @extend %green-button;
      width: 100%;
      margin: 50px auto 0 auto;
      display: flex;
      justify-content: center;
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
    @extend %regular-text;
    font-weight: bold;
    margin-bottom: 3px;
  }

  &_input {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
  }
}

.native-extras {
  @extend %regular-text;
  margin-top: 35px;

  li {
    margin-top: 10px;

    a {
      font-weight: bold;
      color: $colorFont1;
      text-decoration: underline;
    }
  }
}
</style>
