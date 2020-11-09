<template>
  <aside class="top">
    <ul class="top_container">
      <li class="top_item">
        Witaj <span>{{ user }}</span>
      </li>
      <li class="top_item" @click="logout()">Wyloguj się</li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "TheTopBar",
  computed: {
    user() {
      return this.$store.state.userProfile.user.email;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  @extend %regular-text;
  width: 100%;
  padding: 20px $paddingSides;
  background-color: $colorBackground2;
  border-bottom: 1px solid #e6e6e6;

  &_container {
    display: flex;
    justify-content: space-between;
  }

  &_item {
    span {
      font-weight: bold;
    }

    &:nth-of-type(2) {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
