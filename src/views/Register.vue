<template>
  <div class="register-wrapper">
    <header class="register-wrapper_header">
      Zarejestruj się
    </header>
    <section class="register-wrapper_native">
      <form @submit.prevent>
        <div class="native-input">
          <label class="native-input_label" for="email2">Email:</label>
          <input
            class="native-input_input"
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email2"
          />
        </div>
        <div class="native-input">
          <label class="native-input_label" for="password2">Hasło:</label>
          <input
            class="native-input_input"
            v-model.trim="signupForm.password"
            type="password"
            placeholder="******"
            id="password2"
          />
        </div>
        <button @click="signup()" class="button">Zarejestruj się</button>
        <router-link to="/login" tag="button" class="button"
          >Powrót</router-link
        >
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      signupForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.register-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;
  &_header {
    @extend %header-text;
  }

  button {
    display: flex;
    width: 100%;
    border: none;
    padding: 0;
    align-items: center;
    height: 46px;
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
</style>
