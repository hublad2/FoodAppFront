<template>
  <button class="social-facebook" @click="loginFacebook()">
    <img src="@/assets/f_logo_RGB-White_58.png" alt="facebook logo" />
    <span>Zaloguj się przez Facebook</span>
  </button>
</template>

<script>
export default {
  name: "FacebookLogin",
  methods: {
    loginFacebook() {
      this.$store.dispatch("loginFacebook");
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
