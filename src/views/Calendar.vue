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
  </div>
</template>

<script>
import CalendarComponent from "@/components/CalendarComponent.vue";

export default {
  name: "Calendar",
  components: {
    CalendarComponent,
  },
  data() {
    return {};
  },
  methods: {},
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
  max-width: 600px;
  padding: 30px 0;
  justify-content: space-evenly;
  margin: 0 auto;

  @media screen and (min-width: 350px) {
    padding: 30px 30px;
  }

  i {
    color: $colorFont1;
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
    width: 90%;
    background-color: $colorBackground2;
    padding: 10%;
    max-width: 500px;
    max-height: 600px;

    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }
}

.list {
  &_item {
    display: flex;
    align-items: center;
    margin: 30px 0;

    i {
      font-size: 4.4rem;
      width: 50px;
      height: 50px;
    }

    span {
      @extend %green-text;
      font-size: 2.5rem;
      margin-left: 12%;
      justify-self: flex-end;
    }
  }
}
</style>
