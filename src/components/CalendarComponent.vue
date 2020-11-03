<template>
  <div class="calendar" id="calendar">
    <!-- Calendar HTML structure -->
    <!-- <div class="calendar-header">
      <div class="calendar-button calendar-prev"></div>
      <div class="calendar-date-text">Wrzesień 2020</div>
      <div class="calendar-button calendar-next"></div>
    </div>
    <div class="calendar-table">
      <div class="calendar-days">
        <div class="calendar-days_day">Pon</div>
        <div class="calendar-days_day">Wt</div>
        <div class="calendar-days_day">Śro</div>
        <div class="calendar-days_day">Czw</div>
        <div class="calendar-days_day">Pia</div>
        <div class="calendar-days_day">Sob</div>
        <div class="calendar-days_day">Nie</div>
      </div>
      <div class="calendar-table-inner">
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
        <div class="calendar-table-inner_cell">1</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { Calendar } from "../classes/calendar.js";

export default {
  name: "CalendarComponent",
  data() {
    return {
      schedule: null,
    };
  },
  async mounted() {
    await this.fetchScheduleGet();
    let calendarParent = document.querySelector("#calendar");
    let cal = new Calendar(calendarParent, this.schedule);
    cal.init();
  },
  methods: {
    async fetchScheduleGet() {
      let results = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/schedules",
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
      this.schedule = resultsJSON[0].dates;
      this.schedule.forEach((recipe) => {
        recipe.date = new Date(recipe.date);
      });
    },
  },
};
</script>

<style lang="scss">
.calendar {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.calendar-date-text {
  font-size: 3rem;
  text-align: center;
}

.calendar-button {
  color: #333;
  font-family: sans-serif;
  cursor: pointer;
  padding: 10px;
  font-size: 1.8rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-family: sans-serif;
  gap: 5px;

  &_day {
    font-size: 4vw;
    padding: 2vw;

    @media screen and (min-width: 1000px) {
      font-size: 3rem;
      padding: 30px;
    }
  }
}

.calendar-table-inner {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: $colorFont2;
  gap: 5px;

  &_cell {
    text-align: center;
    padding: 3.5vw;
    font-size: 2.5vw;
    background: $colorBackground1;

    @media screen and (min-width: 1000px) {
      font-size: 3rem;
      padding: 40px;
    }
  }

  .active-cell .active-cell:hover {
    cursor: pointer;
  }

  .active-cell:hover {
    background: #d1ebfd;
  }

  .empty-cell {
    background: #fff;
  }
}

.recipe-active {
  background: rgba($color: #17b978, $alpha: 0.3);
}
</style>
