<template>
  <div class="calendar" id="calendar">
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
  mounted() {
    let calendarParent = document.querySelector("#calendar");
    let cal = new Calendar(calendarParent);
    cal.init();
  },
};
</script>

<style lang="scss">
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

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
</style>
