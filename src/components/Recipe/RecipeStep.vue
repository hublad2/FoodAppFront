<template>
  <li class="step">
    <div class="step_icon">{{ index + 1 }}</div>
    <p class="step_text">{{ step }}</p>
  </li>
</template>

<script>
export default {
  name: "RecipeSteps",
  props: {
    step: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.step {
  @extend %text-gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;

  @media screen and (min-width: $tablet) {
    flex-direction: row;
  }

  &_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $colorFontStep;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    padding: 1.5em;
    margin-bottom: 1em;
    background-color: $colorPrimary;

    @media screen and (min-width: $tablet) {
      margin: 0 1em 0 0;
    }
  }
}
</style>
