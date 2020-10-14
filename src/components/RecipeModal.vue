<template>
  <div class="outer-wrapper">
    <div class="recipe-wrapper">
      <header class="recipe-wrapper_header">
        <span>{{ title }}</span>
        <i @click="$emit('close-recipe-modal')" class="fas fa-times"></i>
      </header>
      <img class="recipe-image" :src="photo" />
      <section
        class="recipe-wrapper_recipe recipe-description"
        v-if="!edamamId"
      >
        <h2>Opis</h2>
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
      <section
        class="recipe-wrapper_recipe recipe-preparation"
        v-if="!edamamId"
      >
        <h2>Przygotowanie</h2>
        <p>{{ preparation }}</p>
      </section>
      <!-- If recipe is from Edamam, preparation is a link, not a text -->
      <button v-if="edamamId" class="button">
        <a :href="preparation" target="_blank">Przygotowanie</a>
      </button>
      <button v-if="!listMode" @click="fetchSaveRecipe()" class="button">
        Zapisz przepis
      </button>
      <button
        v-if="listMode && !calendarMode"
        @click="fetchDeleteRecipe()"
        class="button"
      >
        Usuń przepis
      </button>
      <button v-if="calendarMode" @click="fetchDeleteDate()" class="button">
        Usuń przepis z dnia
      </button>
      <router-link v-if="!edamamId" to="/update" tag="button" class="button"
        >Edytuj przepis</router-link
      >
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
    listMode: {
      type: Boolean,
      default: false,
    },
    calendarMode: {
      type: Boolean,
      default: false,
    },
    edamamId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      return: {
        ingredients: [],
        photo: null,
        preparation: null,
        title: null,
        description: null,
        dateId: null,
      },
      recipes: [],
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

  @media screen and (min-width: 750px) {
    max-width: 1200px;
    padding: 50px;
  }

  &_header {
    display: flex;
    justify-content: center;
    align-items: center;
    @extend %header-text;
    margin-bottom: 50px;

    span {
      font-size: 2rem;
    }

    i {
      margin-left: 20px;
      font-size: 4rem;
      color: orangered;
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

.recipe-image {
  width: 80%;
  margin: 0 auto 30px auto;
  border: 1px solid rgba($color: #000000, $alpha: 0.25);

  @media screen and (min-width: 750px) {
    width: 40%;
  }
}

.recipe-description {
  p {
    @extend %regular-text;
    background-color: white;
    padding: 20px;
  }
  margin-bottom: 30px;
}

.recipe-ingredients {
  &_header {
    @media screen and (min-width: 750px) {
      grid-column: span 2;
    }
  }

  &_wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media screen and (min-width: 750px) {
      grid-template-columns: repeat(auto-fit, minmax(120px, 500px));
      justify-content: center;
    }
  }
}

.recipe-preparation {
  margin-top: 30px;
  p {
    @extend %regular-text;
    background-color: white;
    padding: 20px;
  }
  margin-bottom: 30px;
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
