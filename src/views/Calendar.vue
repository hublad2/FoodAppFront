<template>
  <div class="calendar-wrapper">
    <header class="calendar-wrapper_header-primary">
      Kalendarz
    </header>
    <h2 class="calendar-wrapper_header-secondary">
      Kliknij na dzień i dodaj przepis
    </h2>
    <div class="calendar-wrapper_list">
      <CalendarComponent />
    </div>
    <h2 v-if="selected" class="header-recipes">
      {{
        dateSelected.year + "." + dateSelected.month + "." + dateSelected.day
      }}
    </h2>
    <RecipeList
      @fetch-complete="listMounted"
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

export default {
  name: "Calendar",
  components: {
    CalendarComponent,
    RecipeList,
  },
  data() {
    return {
      dateSelected: Date,
      selected: false,
      loading: false,
    };
  },
  methods: {
    showDate(date) {
      this.dateSelected = {
        year: date.year,
        month: date.month + 1,
        day: date.day,
      };
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
  },
  mounted() {
    const calendar = document.querySelector("#calendar");
    calendar.addEventListener("date-selected", (info) => {
      this.showDate(info.detail);
    });
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
    font-size: 4rem;
    margin-top: 30px;
  }

  &_recipe-list {
    margin-top: 30px;
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
