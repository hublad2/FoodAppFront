<template>
  <div class="spacer">
    <span class="spacer_text">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseSpacer",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  grid-area: spacer;
  @extend %text-gray;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;

  &_text {
    background: $colorBackground2;
    padding: 0 10px;
  }
}
</style>
