<template>
  <button class="social-google" @click="loginGoogle()">
    <img src="@/assets/btn_google_dark_normal_ios.svg" alt="google logo" />
    <span>Zaloguj się przez Google</span>
  </button>
</template>

<script>
export default {
  name: "GoogleLogin",
  methods: {
    loginGoogle() {
      this.$store.dispatch("loginGoogle");
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
