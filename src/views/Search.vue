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
            placeholder="Słowa kluczowe"
            id="keywords1"
          />
        </div>
        <div class="params-health params-input">
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
        </div>
        <div class="params-diet params-input">
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
        </div>
      </form>
    </section>
    <button @click="fetchRecipes()" class="button">Wyszukaj</button>
    <section class="search-wrapper_results" v-if="recipes">
      <div v-for="item in recipes" :key="item.uri">
        <img :src="item.recipe.image" />
        <h2>{{ item.recipe.label }}</h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Search",
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
    };
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

.search-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;

  &_header {
    @extend %header-text;
  }

  &_results {
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
    margin-top: 100px;

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
    margin: 0 20px;
  }

  &_input {
    @extend %input;
    width: 40px !important;
    height: 40px !important;
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
</style>
