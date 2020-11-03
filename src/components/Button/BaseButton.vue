<template>
  <button class="button">{{ value }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: $colorPrimary;
  font-size: 1.6rem;
  color: $colorFont3;
  font-weight: bold;
  width: 200px;
  height: 50px;
}
</style>
