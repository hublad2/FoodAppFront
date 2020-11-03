<template>
  <div id="app">
    <aside v-if="this.$store.state.logged">
      <ul class="navigation">
        <li>
          Witaj <span>{{ user }}</span>
        </li>
        <li @click="logout()">Wyloguj się</li>
      </ul>
    </aside>
    <router-view />
  </div>
</template>

<script>
export default {
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

<style lang="scss">
@import "./scss/global.scss";

*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: $primaryFont;
  background-color: $colorBackground2;
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
}

.navigation {
  @extend %regular-text;
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;

  li {
    span {
      font-weight: bold;
    }
  }

  li:nth-of-type(2) {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
