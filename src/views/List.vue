<template>
  <div class="list-wrapper">
    <nav class="list-wrapper_nav nav">
      <router-link to="/entry" class="nav_container">
        <i class="fas fa-angle-left nav_icon-link"></i>
        <BaseButton :class="'nav-button'" :value="'Powrót'" />
      </router-link>
      <router-link to="/create" class="nav_container">
        <i class="fas fa-plus nav_icon-action"></i>
        <BaseButton :class="'action-button'" :value="'Dodaj nowy'" />
      </router-link>
    </nav>
    <header class="list-wrapper_header">
      Moje przepisy
    </header>
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
import BaseButton from "../components/Button/BaseButton";

export default {
  name: "List",
  components: {
    RecipeItem,
    RecipeModal,
    BaseButton,
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
.nav {
  &_container {
    display: flex;
    justify-content: center;
    align-items: center;
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

.list-wrapper {
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
    @extend %heading-2;
  }

  &_results {
    @extend %list-grid;
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
