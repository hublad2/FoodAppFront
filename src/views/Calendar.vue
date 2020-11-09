<template>
  <div class="calendar-wrapper">
    <nav class="list-wrapper_nav nav">
      <router-link to="/entry" class="nav_container">
        <i class="fas fa-angle-left nav_icon-link"></i>
        <BaseButton :class="'nav-button'" :value="'Powrót'" />
      </router-link>
    </nav>
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
    <BaseButton
      @click.native="clickSave"
      v-if="selected && !loading"
      :value="'Dodaj przepis do dnia'"
      class="calendar-wrapper_button"
    />
  </div>
</template>

<script>
import CalendarComponent from "@/components/CalendarComponent";
import RecipeList from "@/components/RecipeList";
import RecipeItem from "@/components/RecipeItem";
import RecipeModal from "@/components/RecipeModal";
import BaseButton from "@/components/Button/BaseButton";

export default {
  name: "Calendar",
  components: {
    CalendarComponent,
    RecipeList,
    RecipeItem,
    RecipeModal,
    BaseButton,
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
      let results = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/recipes/get",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.userProfile.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId: recipe,
          }),
        }
      );

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

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 800px;
  max-width: 1200px;
  padding: 50px $paddingSides;

  &_nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
  }

  @media screen and (min-width: 350px) {
    padding: 30px 30px;
  }

  &_header-icon {
    font-size: 5rem;
  }

  &_header-primary {
    @extend %heading-2;
    margin-top: 30px;
  }

  &_header-secondary {
    @extend %text-gray;
    margin-top: 20px;

    @media screen and (min-width: 350px) {
      max-width: 500px;
    }
  }

  &_list {
    @extend %elevation;
    max-width: 100%;
    padding: 2%;
    max-height: 600px;
    margin-top: 20px;

    @media screen and (min-width: 750px) {
      max-width: 1200px;
      max-height: 60%;
      margin-top: 60px;
    }
  }

  .header-recipes {
    text-align: center;
    @extend %heading-3;
    margin-top: 30px;

    @media screen and (min-width: 750px) {
      margin-top: 60px;
    }
  }

  &_recipe-list {
    margin-top: 30px;
  }

  &_day-list {
    width: 100%;
    @extend %list-grid;
  }

  &_button {
    margin-top: 2em;
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
