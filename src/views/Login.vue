<template>
  <div class="login-wrapper">
    <header class="login-wrapper_header">
      Zaloguj się
    </header>
    <section class="login-wrapper_social">
      <button class="social-google" @click="loginGoogle()">
        <img src="../assets/btn_google_dark_normal_ios.svg" alt="google logo" />
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
        <button @click="login()" class="button">Log In</button>
        <ul class="native-extras">
          <li>
            <span>Nie masz konta?</span>
            <a>Zarejestruj się</a>
          </li>
          <li>
            <span>Zapomniałeś hasło?</span>
            <a>Odzyskaj hasło</a>
          </li>
        </ul>
      </form>
    </section>
    <!-- <div class="col2">
      <form @submit.prevent>
        <h1>Welcome Back</h1>
        <div>
          <label for="email1">Email</label>
          <input
            v-model.trim="loginForm.email"
            type="text"
            placeholder="you@email.com"
            id="email1"
          />
        </div>
        <div>
          <label for="password1">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="******"
            id="password1"
          />
        </div>
        <button @click="login()" class="button">Log In</button>
        <div class="extras">
          <a>Forgot Password</a>
          <a>Create an Account</a>
        </div>
      </form>
      <form @submit.prevent>
        <h1>Get Started</h1>
        <div>
          <label for="email2">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email2"
          />
        </div>
        <div>
          <label for="password2">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="min 6 characters"
            id="password2"
          />
        </div>
        <button @click="signup()" class="button">Sign Up</button>
        <div class="extras">
          <a>Back to Log In</a>
        </div>
      </form>
    </div> -->
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

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  justify-content: space-evenly;
  &_header {
    @extend %header-text;
  }

  &_social {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin: 10px 0 20px;

    span {
      background: $colorBackground1;
      padding: 0 10px;
    }
  }

  &_native {
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

  &_label {
    @extend %regular-text;
    font-weight: bold;
  }

  &_input {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
  }
}
</style>
