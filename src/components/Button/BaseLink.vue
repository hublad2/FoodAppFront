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
  background-color: $colorPrimary;
  font-size: 1.6rem;
  text-decoration: none;
  color: $colorFont3;
  font-weight: bold;
  width: 200px;
  height: 50px;
  border-radius: 8px;
}
</style>
