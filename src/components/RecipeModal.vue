<template>
  <div class="outer-wrapper">
    <div class="recipe-wrapper">
      <header class="recipe-wrapper_header">
        <span>{{ title }}</span>
        <i @click="$emit('closeRecipeModal')" class="fas fa-times"></i>
      </header>
      <section class="recipe-wrapper_recipe recipe-ingredients">
        <h2 class="recipe-ingredients_header">Składniki:</h2>
        <div class="recipe-ingredients_wrapper">
          <Ingredient
            v-for="ingredient in ingredients"
            :key="ingredient.text"
            :itemIngredient="ingredient"
          />
        </div>
      </section>
      <button class="button">
        <a :href="preparation" target="_blank">Przygotowanie</a>
      </button>
      <button class="button">Zapisz przepis</button>
    </div>
  </div>
</template>

<script>
import Ingredient from "@/components/Ingredient.vue";

export default {
  name: "RecipeModal",
  components: {
    Ingredient,
  },
  props: {
    itemRecipeModal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      return: {
        ingredients: [],
        photo: null,
        preparation: null,
        title: null,
      },
      recipes: [],
    };
  },
  created() {
    this.ingredients = this.itemRecipeModal.recipe.ingredients;
    this.photo = this.itemRecipeModal.recipe.image;
    this.title = this.itemRecipeModal.recipe.label;
    this.preparation = this.itemRecipeModal.recipe.url;
  },
  methods: {
    async fetchRecipes() {
      // Put marked health labels into array of strings
      let healthArray = [];
      if (this.searchForm.health.sugar) healthArray.push("sugar-conscious");
      if (this.searchForm.health.vegetarian) healthArray.push("vegeterian");

      // Fetch recipes
      let results = await fetch("http://localhost:3000/recipes/edamam", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.userProfile.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: this.searchForm.keywords,
          healthLabel: healthArray,
          dietLabel: this.searchForm.diet,
        }),
      });

      let resultsJSON = await results.json();
      this.recipes = resultsJSON.hits;
      console.log(resultsJSON);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.outer-wrapper {
  position: fixed;
  background-color: $colorBackground1;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.recipe-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;

  &_header {
    @extend %header-text;
    margin-bottom: 50px;

    i {
      margin-left: 20px;
    }
  }

  h2 {
    @extend %regular-text;
    font-size: 2.2rem;
    font-weight: 500;
    text-align: left;
    margin-bottom: 30px;
  }
}

.recipe-ingredients {
  &_wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.button {
  @extend %green-button;
  width: 100%;
  margin: 50px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  width: 100%;
  text-decoration: none;
  color: inherit;
}
</style>
