<template>
  <div class="outer-wrapper">
    <div class="recipe-wrapper">
      <nav class="recipe-wrapper_nav nav">
        <div @click="$emit('close-recipe-modal')" class="nav_container">
          <i class="fas fa-angle-left nav_icon-link"></i>
          <BaseButton :class="'nav-button'" :value="'Powrót'" />
        </div>
        <div
          v-if="listMode && !calendarMode"
          @click="fetchDeleteRecipe()"
          class="nav_container"
        >
          <i class="fas fa-trash-alt nav_icon-action"></i>
          <BaseButton :class="'action-button'" :value="'Usuń przepis'" />
        </div>
      </nav>
      <header class="recipe-wrapper_header">
        <span>{{ title }}</span>
        <BaseLink
          v-if="!edamamId && !calendarMode"
          :value="'Edytuj przepis'"
          :target="'/update'"
        />
        <BaseButton
          v-if="calendarMode"
          @click.native="fetchDeleteDate()"
          :value="'Usuń przepis z dnia'"
        />
      </header>
      <div class="recipe-image">
        <img :src="photo" />
      </div>
      <section
        class="recipe-wrapper_recipe recipe-description"
        v-if="!edamamId"
      >
        <h2 class="recipe-description_header">Opis</h2>
        <p>{{ description }}</p>
      </section>
      <section class="recipe-wrapper_recipe recipe-ingredients">
        <div class="recipe-ingredients_wrapper">
          <h2 class="recipe-ingredients_header">Składniki</h2>
          <Ingredient
            v-for="ingredient in ingredients"
            :key="ingredient.text"
            :itemIngredient="ingredient"
            :edamamId="edamamId"
          />
        </div>
      </section>
      <section class="recipe-wrapper_recipe recipe-preparation">
        <h2 class="recipe-preparation_header">Przygotowanie</h2>
        <!-- If recipe is from Edamam, preparation is a link, not a text -->
        <a v-if="edamamId" :href="preparation" target="_blank">
          <BaseButton :value="'Przejdź'" />
        </a>
        <ul class="recipe-preparation_list" v-if="!edamamId">
          <RecipeStep
            :key="index"
            v-for="(step, index) in preparation"
            :step="step"
            :index="index"
          />
        </ul>
      </section>
      <BaseButton
        v-if="!listMode"
        @click.native="fetchSaveRecipe()"
        :value="'Zapisz przepis'"
      />
    </div>
  </div>
</template>

<script>
import Ingredient from "@/components/Ingredient.vue";
import BaseButton from "@/components/Button/BaseButton";
import BaseLink from "@/components/Button/BaseLink";
import RecipeStep from "@/components/Recipe/RecipeStep";

export default {
  name: "RecipeModal",
  components: {
    Ingredient,
    BaseButton,
    BaseLink,
    RecipeStep,
  },
  props: {
    itemRecipeModal: {
      type: Object,
      required: true,
    },
    listMode: {
      type: Boolean,
      default: false,
    },
    calendarMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ingredients: [],
      photo: null,
      preparation: [],
      title: null,
      description: null,
      dateId: null,
      recipes: [],
      edamamId: false,
    };
  },
  created() {
    if (!this.listMode) {
      this.ingredients = this.itemRecipeModal.recipe.ingredients;
      this.photo = this.itemRecipeModal.recipe.image;
      this.title = this.itemRecipeModal.recipe.label;
      this.preparation = this.itemRecipeModal.recipe.url;
    } else {
      // If recipe is being shown in list view, it gets data in different form
      this.ingredients = this.itemRecipeModal.ingredients;
      this.photo = this.itemRecipeModal.photo;
      this.title = this.itemRecipeModal.name;
      this.description = this.itemRecipeModal.description;
      this.preparation = this.itemRecipeModal.preparation;
      this.edamamId = this.itemRecipeModal.edamamId;
    }

    if (this.calendarMode) this.dateId = this.itemRecipeModal.dateId;

    this.updateRecipeState();
  },
  methods: {
    async fetchSaveRecipe() {
      if (this.$store.state.userProfile.token) {
        //Run only if the user selected image to send
        let results = await fetch(
          "https://hidden-cliffs-64077.herokuapp.com/recipes/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.userProfile.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.title,
              ingredients: this.ingredients,
              description: "",
              preparation: this.preparation,
              userId: this.$store.state.userProfile.user._id,
              photo: this.photo,
              edamamId: true,
            }),
          }
        );

        let resultsJSON = await results.json();

        if (resultsJSON) this.$emit("close-recipe-modal");
        console.log(resultsJSON);
      } else {
        this.$router.push({ path: "login" });
      }
    },
    async fetchDeleteRecipe() {
      if (this.$store.state.userProfile.token) {
        try {
          let results = await fetch(
            "https://hidden-cliffs-64077.herokuapp.com/recipes/remove",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.$store.state.userProfile.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: this.title,
              }),
            }
          );

          let resultsJSON = await results.json();
          if (resultsJSON) this.$emit("close-recipe-modal-delete");
          console.log(resultsJSON);
        } catch (err) {
          alert("Something went wrong");
          console.log(err);
        }
      } else {
        this.$router.push({ path: "login" });
      }
    },
    async fetchDeleteDate() {
      if (this.$store.state.userProfile.token) {
        let results = await fetch(
          "https://hidden-cliffs-64077.herokuapp.com/schedules/remove",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.userProfile.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: this.$store.state.userProfile.user._id,
              dateId: this.dateId,
            }),
          }
        );

        let resultsJSON = await results.json();

        if (resultsJSON) this.$emit("close-recipe-modal");
        console.log(resultsJSON);
      } else {
        this.$router.push({ path: "login" });
      }
    },
    updateRecipeState() {
      console.log("Updating store");
      this.$store.dispatch("updateRecipe", {
        ingredients: this.ingredients,
        photo: this.photo,
        title: this.title,
        preparation: this.preparation,
        description: this.description,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  &_container {
    display: flex;
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

.outer-wrapper {
  position: fixed;
  background-color: $colorBackground2;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.recipe-wrapper {
  @extend %text-gray;
  display: flex;
  flex-direction: column;
  padding: 50px $paddingSides;
  max-width: 1000px;
  margin: 0 auto;

  &_nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
  }

  &_header {
    @extend %heading-3;

    span {
      display: block;
    }

    a {
      margin-top: 30px;
    }

    @media screen and (min-width: $tablet) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        margin-top: 0;
      }
    }

    margin-bottom: 50px;
  }
}

.recipe-image {
  @extend %elevation;
  padding: 2em;
  margin-bottom: 30px;
  max-width: 700px;
  height: 400px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.recipe-description {
  @extend %elevation;
  padding: 2em;

  &_header {
    @extend %heading-4;
    margin-bottom: 30px;
  }
  margin-bottom: 30px;
}

.recipe-ingredients {
  @extend %elevation;
  padding: 2em;
  margin-bottom: 30px;

  &_header {
    @extend %heading-4;
    margin-bottom: 30px;

    @media screen and (min-width: 750px) {
      grid-column: span 2;
    }
  }

  &_wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media screen and (min-width: 750px) {
      grid-template-columns: 1fr 1fr;
    }
  }
}

.recipe-preparation {
  @extend %elevation;
  padding: 2em;
  margin-bottom: 30px;

  &_header {
    @extend %heading-4;
    margin-bottom: 30px;
  }
}

a {
  width: 100%;
  text-decoration: none;
  color: inherit;
}
</style>
