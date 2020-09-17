<template>
  <div class="calendar">
    <div class="calendar-header">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.calendar {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
}

.calendar-header {
}

.calendar-date-text {
  font-size: 3rem;
  text-align: center;
}

.calendar-button {
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;

  &_day {
    font-size: 2rem;
    border: 1px solid gray;
  }
}

.calendar-table-inner {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  &_cell {
    text-align: center;
    border: 1px solid green;
    padding: 20px;
    font-size: 2.5vw;
  }
}
</style>
