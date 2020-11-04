<template>
  <router-link class="button-link" :to="target">{{ value }}</router-link>
</template>

<script>
export default {
  name: "BaseLink",
  props: {
    value: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: $colorPrimary;
  font-size: 1.6rem;
  color: $colorFont3;
  font-weight: bold;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
}

.action-link {
  border: none;
  background: none;
  color: $colorPrimary;
  font-size: 1.8rem;
}

.nav-link {
  border: none;
  background: none;
  color: $colorFontNav;
  display: inline;
  padding: 20px 20px;
}
</style>
