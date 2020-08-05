<template>
  <div class="ingredients">
    <img :src="photo" />
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "Ingredient",
  props: {
    itemIngredient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photo: null,
      description: null,
    };
  },
  mounted() {
    this.photo = this.itemIngredient.image;
    this.description = this.itemIngredient.text;
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.ingredients {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.25);
  align-items: center;

  img {
    width: 100px;
    height: 100px;

    @media screen and(min-width:500px) {
      width: 20vw;
      height: 20vw;
    }
  }
  p {
    @extend %regular-text;
    padding: 0 30px;
    @media screen and(min-width:500px) {
      font-size: 3.5vw;
    }
  }
}
</style>
