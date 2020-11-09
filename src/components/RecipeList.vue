<template>
  <div @click="changeDisplay" class="recipe-select">
    <div class="recipe-select_initial">
      <div class="recipe-modal">
        <img :src="frontRecipe.photo" alt="" />
        <h3>{{ frontRecipe.name }}</h3>
      </div>
      <i class="fas fa-angle-down"></i>
    </div>
    <div v-if="displayList" class="recipe-select_list">
      <div
        v-for="recipe in recipes.slice(1)"
        :key="recipe._id"
        class="recipe-modal"
        @click="updateFrontRecipe(recipe)"
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
      frontRecipe: null,
    };
  },
  async mounted() {
    await this.fetchRecipes();
    this.frontRecipe = this.recipes[0];
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

      // Fetching is complete, let other components know, and do other stuff
      this.$emit("fetch-complete");
    },
    async fetchSchedule(date) {
      let results = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/schedules/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.userProfile.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: this.$store.state.userProfile.user._id,
            recipeId: this.frontRecipe._id,
            date: new Date(date.year, date.month - 1, date.day),
          }),
        }
      );

      let resultsJSON = await results.json();
      console.log(resultsJSON);

      // Fetching is complete, let other components know, and do other stuff
      this.$emit("fetch-schedule-complete");
    },
    updateFrontRecipe(recipe) {
      this.frontRecipe = recipe;
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe-select {
  @extend %elevation;
  width: 100%;
  background: $colorBackground2;

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
