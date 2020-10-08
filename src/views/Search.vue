<template>
  <div class="search-wrapper">
    <header class="search-wrapper_header">
      Wyszukaj przepisy
    </header>
    <section class="search-wrapper_params">
      <form @submit.prevent>
        <div class="params-keywords params-input">
          <i class="fas fa-search"></i>
          <input
            class="params-keywords_input params-input_input"
            v-model.trim="searchForm.keywords"
            type="text"
            placeholder="Wpisz składnik, nazwę potrawy... (ang)"
            id="keywords1"
          />
        </div>
        <!-- <div class="params-health params-input">
          <input
            class="params-health_input"
            v-model.trim="searchForm.health.sugar"
            type="checkbox"
            id="health1"
          />
          <label class="params-input_label params-health_label" for="health1"
            >Mało cukru</label
          >
          <input
            class="params-health_input"
            v-model.trim="searchForm.health.vegetarian"
            type="checkbox"
            id="health2"
          />
          <label class="params-input_label params-health_label" for="health2"
            >Wegetariańskie</label
          >
        </div> -->
        <!-- <div class="params-diet params-input">
          <label class="params-input_label" for="diet1">Dieta</label>
          <select
            id="diet1"
            v-model.trim="searchForm.diet"
            class="params-diet_input params-input_input"
          >
            <option value="">Domyślna</option>
            <option value="balanced">Zbalansowana</option>
            <option value="high-protein">Wysokobiałkowa</option>
            <option value="high-fiber">Bogata w błonnik</option>
            <option value="low-fat">Niskotłuszczowa</option>
            <option value="low-carb">Mało węglowodanów</option>
            <option value="low-sodium">Mało soli</option>
          </select>
        </div> -->
      </form>
    </section>
    <button @click="fetchRecipes()" class="button">Wyszukaj</button>
    <router-link to="/entry" tag="button" class="button">Powrót</router-link>
    <section class="search-wrapper_results" v-if="recipes">
      <!-- List of all fetched recipes -->
      <RecipeItem
        v-for="item in recipes"
        :itemRecipe="item"
        :key="item.uri"
        @click.native="handleRecipeModalOpen(item)"
      />
    </section>
    <!-- Component displaying information when RecipeItem is selected -->
    <RecipeModal
      v-if="recipeModalOpen"
      :itemRecipeModal="recipeModalItem"
      @close-recipe-modal="recipeModalOpen = false"
    />
    <div v-if="loading" class="lds-dual-ring"></div>
  </div>
</template>

<script>
import RecipeItem from "@/components/RecipeItem.vue";
import RecipeModal from "@/components/RecipeModal.vue";

export default {
  name: "Search",
  components: {
    RecipeItem,
    RecipeModal,
  },
  data() {
    return {
      searchForm: {
        keywords: "",
        health: {
          sugar: false,
          vegetarian: false,
        },
        diet: "",
      },
      recipes: [],
      recipeModalItem: null,
      recipeModalOpen: false,
      loading: false,
    };
  },
  methods: {
    handleRecipeModalOpen(item) {
      this.recipeModalItem = item;
      this.recipeModalOpen = true;
    },
    async fetchRecipes() {
      this.loading = true;
      this.recipes = null;
      // Put marked health labels into array of strings
      let healthArray = [];
      if (this.searchForm.health.sugar) healthArray.push("sugar-conscious");
      if (this.searchForm.health.vegetarian) healthArray.push("vegeterian");

      // Fetch recipes
      let results = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/recipes/edamam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: this.searchForm.keywords,
            healthLabel: healthArray,
            dietLabel: this.searchForm.diet,
          }),
        }
      );

      let resultsJSON = await results.json();
      this.recipes = resultsJSON.hits;
      console.log(resultsJSON);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.search-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;
  align-items: center;

  &_header {
    @extend %header-text;
  }

  &_results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 300px));
    justify-content: center;
    gap: 60px;
    margin-top: 100px;
    max-width: 70vw;

    img {
      width: 100%;
    }

    h2 {
      @extend %green-text;
      font-size: 2.2rem;
      font-weight: 500;
      text-align: center;
      margin-top: 30px;
    }
  }

  &_params {
    width: 100%;
    @media screen and (min-width: 750px) {
      width: 550px;
      margin: 0 auto;
    }
  }
}

.params-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  &_label {
    @extend %regular-text;
    font-weight: 500;
  }

  &_input {
    @extend %input;
    height: 40px;
  }
}

.params-keywords {
  i {
    font-size: 4.4rem;
    width: 50px;
    color: $colorFont1;
    margin-right: 15px;
  }
  &_input {
    flex: 1;
  }
}

.params-diet {
  label {
    margin-right: 15px;
    width: 50px;
  }
  &_input {
    flex: 1;
  }
}

.params-health {
  justify-content: flex-start;

  &_label {
    margin: 0;
    @media screen and (min-width: 340px) {
      margin: 0 5px;
    }

    @media screen and (min-width: 500px) {
      margin: 0 20px;
    }
  }

  &_input {
    @extend %input;
    width: 50px !important;
    height: 40px !important;

    @media screen and (min-width: 340px) {
      width: 40px !important;
      height: 40px !important;
    }
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

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 50px auto 0 auto;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid $colorBackground3;
  border-color: $colorBackground3 transparent $colorBackground3 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
