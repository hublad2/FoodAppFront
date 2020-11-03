<template>
  <div class="list-wrapper">
    <header class="list-wrapper_header">
      Twoje przepisy
    </header>
    <div class="list-wrapper_add">
      <router-link to="/create" tag="button" class="button"
        >Dodaj przepis</router-link
      >
      <router-link to="/entry" tag="button" class="button">Powrót</router-link>
    </div>
    <section class="list-wrapper_results" v-if="recipes">
      <!-- List of all fetched recipes -->
      <RecipeItem
        v-for="item in recipes"
        :itemRecipe="item"
        :edamamId="item.edamamId"
        :key="item._id"
        :listMode="listMode"
        @click.native="handleRecipeModalOpen(item)"
      />
    </section>
    <!-- Component displaying information when RecipeItem is selected -->
    <RecipeModal
      v-if="recipeModalOpen"
      :itemRecipeModal="recipeModalItem"
      :listMode="listMode"
      @close-recipe-modal="recipeModalOpen = false"
      @close-recipe-modal-delete="updateList"
    />
    <div v-if="loading" class="lds-dual-ring"></div>
  </div>
</template>

<script>
import RecipeItem from "@/components/RecipeItem.vue";
import RecipeModal from "@/components/RecipeModal.vue";

export default {
  name: "List",
  components: {
    RecipeItem,
    RecipeModal,
  },
  data() {
    return {
      recipes: [],
      recipeModalItem: null,
      recipeModalOpen: false,
      listMode: true,
      loading: true,
    };
  },
  created() {
    // Fetch user recipes
    this.fetchRecipes();
  },
  methods: {
    handleRecipeModalOpen(item) {
      this.recipeModalItem = item;
      this.recipeModalOpen = true;
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
      this.loading = false;
    },
    updateList() {
      this.recipeModalOpen = false;
      this.fetchRecipes();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 300px));
    justify-content: center;
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

  &_add {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 70px 0 0 0;

    i {
      color: $colorFont1;
      font-size: 4.4rem;
      margin-right: 25px;
    }

    button:nth-of-type(1) {
      margin-bottom: 20px;
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

.button {
  @extend %green-button;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
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
