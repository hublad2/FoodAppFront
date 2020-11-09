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
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $primaryFont;
  background-color: $colorPrimary;
  font-size: 1.6rem;
  color: $colorFont3;
  font-weight: bold;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.action-button {
  border: none;
  background: none;
  color: $colorPrimary;
  font-size: 1.8rem;
  width: auto;
  margin: 2px 0 0 10px;
}

.nav-button {
  border: none;
  background: none;
  color: $colorFontNav;
  margin: 2px 0 0 10px;
  width: auto;
  font-size: 1.8rem;
}

.secondary {
  background: none;
  border: 2px solid $colorPrimary;
  color: $colorPrimary;
}
</style>
