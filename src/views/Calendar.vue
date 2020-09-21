<template>
  <div class="calendar-wrapper">
    <header class="calendar-wrapper_header-primary">
      Kalendarz
    </header>
    <h2 class="calendar-wrapper_header-secondary">
      Kliknij na dzień i dodaj przepis
    </h2>
    <div class="calendar-wrapper_list">
      <CalendarComponent
        @calendar-initiated.native="updateFetchedRecipes"
        @date-selected.native="showDate"
        :key="calendarKey"
      />
    </div>
    <h2 v-if="selected" class="header-recipes">
      {{
        "Twoje przepisy na dzień: " +
          dateSelected.year +
          "." +
          dateSelected.month +
          "." +
          dateSelected.day
      }}
    </h2>
    <section class="calendar-wrapper_day-list" v-if="fetchedRecipes">
      <RecipeItem
        v-for="recipe in fetchedRecipes"
        :itemRecipe="recipe[0]"
        :edamamId="recipe.edamamId"
        :key="recipe._id"
        :listMode="listMode"
        @click.native="handleRecipeModalOpen(recipe)"
      />
    </section>
    <RecipeModal
      v-if="recipeModalOpen"
      :itemRecipeModal="recipeModalItem"
      :listMode="listMode"
      :calendarMode="calendarMode"
      @close-recipe-modal="closeAndRefreshModal"
    />
    <RecipeList
      @fetch-complete="listMounted"
      @fetch-schedule-complete="updateCalendar"
      v-if="selected"
      class="calendar-wrapper_recipe-list"
      ref="recipeList"
    />
    <div v-if="loading" class="lds-dual-ring"></div>
    <button @click="clickSave" v-if="selected && !loading" class="button">
      Dodaj przepis do dnia
    </button>
    <router-link to="/entry" tag="button" class="button">Powrót</router-link>
  </div>
</template>

<script>
import CalendarComponent from "@/components/CalendarComponent.vue";
import RecipeList from "@/components/RecipeList.vue";
import RecipeItem from "@/components/RecipeItem.vue";
import RecipeModal from "@/components/RecipeModal.vue";

export default {
  name: "Calendar",
  components: {
    CalendarComponent,
    RecipeList,
    RecipeItem,
    RecipeModal,
  },
  data() {
    return {
      dateSelected: Date,
      selected: false,
      loading: false,
      fetchedRecipes: [],
      listMode: true,
      calendarMode: true,
      recipeModalItem: null,
      recipeModalOpen: false,
      calendarKey: 0,
      currentDayDetail: null,
    };
  },
  mounted() {},
  methods: {
    kekw() {
      console.log("kekw");
    },
    handleRecipeModalOpen(item) {
      this.recipeModalItem = item[0];
      this.recipeModalOpen = true;
    },
    showDate(e) {
      this.currentDayDetail = e.detail;

      this.fetchedRecipes = [];
      this.dateSelected = {
        year: this.currentDayDetail.year,
        month: this.currentDayDetail.month + 1,
        day: this.currentDayDetail.day,
      };

      if (this.currentDayDetail.dates) {
        this.currentDayDetail.dates.forEach((date) => {
          this.fetchRecipeById(date.recipe, date.dateId);
        });
      }
      if (!this.selected) {
        this.loading = true;
        this.selected = true;
      }
    },
    listMounted() {
      this.loading = false;
    },
    clickSave() {
      this.$refs.recipeList.fetchSchedule(this.dateSelected);
    },
    async fetchRecipeById(recipe, dateId) {
      let results = await fetch("http://localhost:3000/recipes/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.userProfile.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe,
        }),
      });

      let resultsJSON = await results.json();
      resultsJSON[0].dateId = dateId;
      this.fetchedRecipes.push(resultsJSON);
    },
    updateFetchedRecipes() {
      if (this.calendarKey !== 0) {
        const dayCell = document.getElementById(this.currentDayDetail.day - 1);
        dayCell.click();
      }
    },
    closeAndRefreshModal() {
      this.recipeModalOpen = false;
      this.updateCalendar();
    },
    updateCalendar() {
      this.calendarKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 800px;
  max-width: 1000px;
  padding: 30px 0;
  margin: 0 auto;

  @media screen and (min-width: 350px) {
    padding: 30px 30px;
  }

  i {
    color: $colorFont1;
    cursor: pointer;
  }

  &_header-icon {
    font-size: 5rem;
  }

  &_header-primary {
    @extend %header-text;
    margin-top: 30px;
  }

  &_header-secondary {
    @extend %regular-text;
    text-align: center;
    width: 260px;
    margin-top: 20px;

    @media screen and (min-width: 350px) {
      max-width: 500px;
    }
  }

  &_button {
    @extend %green-button;
    margin-top: 50px;
  }

  &_list {
    height: 80%;
    background-color: $colorBackground2;
    padding: 2%;
    max-height: 600px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
    margin-top: 30px;

    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }

  .header-recipes {
    text-align: center;
    @extend %green-text;
    font-size: 3rem;
    margin-top: 30px;
  }

  &_recipe-list {
    margin-top: 30px;
  }

  &_day-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 300px));
    justify-content: center;
    gap: 60px;
    margin-top: 50px;

    img {
      width: 100%;
    }
  }
}

.add-recipes {
  display: flex;
  align-items: center;
  margin-top: 20px;

  i {
    font-size: 5rem;
    margin-right: 20px;
  }

  &_header {
    @extend %regular-text;
    font-size: 6vw;
  }
}

.button {
  @extend %green-button;
  width: 100%;
  margin: 50px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 40px auto 0 auto;
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
