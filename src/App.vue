<template>
  <div id="app">
    <TheTopBar v-if="this.$store.state.logged" />
    <router-view />
  </div>
</template>

<script>
import TheTopBar from "@/components/TheTopBar";
export default {
  components: {
    TheTopBar,
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

a {
  text-decoration: none;
  color: inherit;
}
</style>
