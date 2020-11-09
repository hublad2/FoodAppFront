<template>
  <div class="register-bg-wrapper">
    <div class="register-wrapper">
      <header class="register-wrapper_header">
        Zarejestruj się
      </header>
      <section class="register-wrapper_native">
        <form @submit.prevent>
          <LabeledField
            :label="'Email:'"
            :type="'text'"
            :placeholder="'twoj@email.com'"
            :id="'email2'"
            :value="signupForm.email"
            @input.native="(e) => (signupForm.email = e.target.value)"
          />
          <LabeledField
            :label="'Hasło:'"
            :type="'password'"
            :placeholder="'******'"
            :id="'password2'"
            :value="signupForm.password"
            @input.native="(e) => (signupForm.password = e.target.value)"
          />
          <div class="button-wrapper">
            <BaseButton
              class="button-register"
              @click.native="signup()"
              :value="'Zarejestruj się'"
            />
            <BaseLink class="button-nav" :target="'/login'" :value="'Powrót'" />
          </div>
        </form>
      </section>
      <div class="register-wrapper_logo">
        <div class="logo">
          <i class="fas fa-egg"></i>
          <h3>Kuchnio Zarządzacz</h3>
        </div>
      </div>
    </div>
    <div class="background-register"></div>
  </div>
</template>

<script>
import BaseButton from "@/components/Button/BaseButton";
import BaseLink from "@/components/Button/BaseLink";
import LabeledField from "@/components/Inputs/LabeledField";

export default {
  name: "Register",
  components: {
    BaseButton,
    LabeledField,
    BaseLink,
  },
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
      // Send user data to Vuex
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-bg-wrapper {
  @media screen and (min-width: $tablet) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .background-register {
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

.register-wrapper {
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

  &_native {
    grid-area: native;
    .button-wrapper {
      margin: 30px auto 0 auto;
      display: flex;
      justify-content: center;
    }
    .button-register {
      flex: 1;
      margin-right: 1em;
    }
    .button-nav {
      flex: 1;
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
