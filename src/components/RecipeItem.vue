<template>
  <div class="recipe-item">
    <img class="recipe-item_image" :src="photo" />
    <h2 class="recipe-item_header">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "RecipeItem",
  props: {
    itemRecipe: {
      type: Object,
      required: true,
    },
    listMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      photo: null,
      title: null,
    };
  },
  mounted() {
    if (!this.listMode) {
      this.photo = this.itemRecipe.recipe.image;
      this.title = this.itemRecipe.recipe.label;
    } else {
      this.photo = this.itemRecipe.photo;
      this.title = this.itemRecipe.name;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";
.recipe-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &_image {
    width: 300px;
    height: 300px;
  }

  &_header {
    @extend %green-text;
    font-size: 2.2rem;
    font-weight: 500;
    text-align: center;
    margin-top: 30px;
  }
}
</style>
