<template>
  <div class="search-wrapper">
    <nav class="search-wrapper_nav nav">
      <router-link to="/entry" class="nav_container">
        <i class="fas fa-angle-left nav_icon-link"></i>
        <BaseButton :class="'nav-button'" :value="'Powrót'" />
      </router-link>
    </nav>
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
      <BaseButton @click.native="fetchRecipes()" :value="'Wyszukaj'" />
    </section>
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
import RecipeItem from "@/components/RecipeItem";
import RecipeModal from "@/components/RecipeModal";
import BaseButton from "@/components/Button/BaseButton";

export default {
  name: "Search",
  components: {
    RecipeItem,
    RecipeModal,
    BaseButton,
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
.nav {
  &_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  &_icon-link {
    font-size: 3.5rem;
    color: #363837;
  }

  &_icon-action {
    font-size: 3rem;
    color: $colorPrimary;
  }
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 800px;
  padding: 50px $paddingSides;

  &_nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
  }

  &_header {
    @extend %heading-3;
  }

  &_results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 350px;
    gap: 60px;
    margin-top: 50px;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    margin-top: 2em;

    @media screen and (min-width: $tablet) {
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      form {
        margin-right: 1em;
        flex: 1;
      }
    }
  }
}

.params-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_label {
    @extend %regular-text;
    font-weight: 500;
  }

  &_input {
    background: #ffffff;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
  }
}

.params-keywords {
  i {
    font-size: 4.4rem;
    width: 50px;
    color: $colorFontSubtle;
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
