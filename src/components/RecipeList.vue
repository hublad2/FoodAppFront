<template>
  <div @click="changeDisplay" class="recipe-select">
    <div class="recipe-select_initial">
      <div class="recipe-modal">
        <img :src="recipes[0].photo" alt="" />
        <h3>{{ recipes[0].name }}</h3>
      </div>
      <i class="fas fa-angle-down"></i>
    </div>
    <div v-if="displayList" class="recipe-select_list">
      <div
        v-for="recipe in recipes.slice(1)"
        :key="recipe"
        class="recipe-modal"
      >
        <img :src="recipe.photo" alt="" />
        <h3>{{ recipe.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  data() {
    return {
      displayList: false,
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    changeDisplay() {
      this.displayList = !this.displayList;
    },
    async fetchRecipes() {
      let results = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/recipes/user",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.userProfile.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: this.$store.state.userProfile.user._id,
          }),
        }
      );

      let resultsJSON = await results.json();
      this.recipes = resultsJSON;
      console.log(resultsJSON);
      this.$emit("fetch-complete");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.recipe-select {
  width: 100%;
  background: $colorBackground2;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);

  &_initial {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    i {
      font-size: 3rem;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  &_list {
    border-top: 1px solid $borderColor1;
  }
}

.recipe-modal {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 20px;
  padding: 10px 0;

  img {
    height: 120px;
    width: 120px;
  }

  h3 {
    @extend %regular-text;
    margin-left: 20px;
  }
}
</style>
