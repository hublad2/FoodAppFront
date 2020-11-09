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
    /* Behaviour of RecipeItem changes depending, if the recipe is beeing shown in List view or not */
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
.recipe-item {
  @extend %elevation;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;

  &_image {
    width: 100%;
    height: 80%;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  }

  &_header {
    @extend %card-item;
    margin-top: 30px;
  }
}
</style>
