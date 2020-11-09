<template>
  <div class="entry-bg-wrapper">
    <div class="entry-wrapper">
      <section class="entry-wrapper_search your">
        <div class="your_item">
          <i class="fas fa-search"></i>
          <BaseLink
            :target="'/search'"
            :value="'Wyszukaj'"
            :class="'menu-link'"
          />
        </div>
      </section>
      <BaseSpacer :value="'Twoje przepisy'" />
      <section class="entry-wrapper_your your">
        <div class="your_item">
          <i class="fas fa-scroll"></i>
          <BaseLink :target="'/list'" :value="'Lista'" :class="'menu-link'" />
        </div>
        <div class="your_item">
          <i class="fas fa-calendar"></i>
          <BaseLink
            :target="'/calendar'"
            :value="'Kalendarz'"
            :class="'menu-link'"
          />
        </div>
      </section>
      <div class="entry-wrapper_logo">
        <div class="logo">
          <i class="fas fa-egg"></i>
          <h3>Kuchnio Zarządzacz</h3>
        </div>
      </div>
    </div>
    <div class="background-entry"></div>
  </div>
</template>

<script>
import BaseLink from "../components/Button/BaseLink";
import BaseSpacer from "@/components/Spacer/BaseSpacer";

export default {
  name: "Entry",
  components: {
    BaseLink,
    BaseSpacer,
  },
};
</script>

<style lang="scss" scoped>
.entry-bg-wrapper {
  @media screen and (min-width: $tablet) {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .background-entry {
    @media screen and (min-width: $tablet) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: url("../assets/photo-2.jpeg") no-repeat;
      background-size: cover;
      background-position: center;
      z-index: -1;
      opacity: 0.2;
    }
  }
}

.entry-wrapper {
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    "logo"
    "search"
    "spacer"
    "your";
  margin: 0 auto;
  padding: 50px $paddingSides;
  background-color: $colorBackground2;

  @media screen and (min-width: $tablet) {
    grid-template-columns: 500px;
    box-shadow: 0 6px 20px rgba(#0d3320, 0.1);
    border-radius: 8px;
  }

  @media screen and (min-width: $desktop) {
    width: 70%;
    max-width: 1800px;
    display: grid;
    grid-template-columns: 1fr 500px;
    grid-template-areas:
      "logo search"
      "logo spacer"
      "logo your";
  }

  &_search {
    grid-area: search;
  }

  &_your {
    grid-area: your;
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }

  &_logo {
    @media screen and (min-width: $desktop) {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-area: logo;
      height: 100%;
      width: 100%;
    }
  }
}

.your {
  &_item {
    display: flex;
    margin: 30px 0;

    i {
      font-size: 4.4rem;
      width: 50px;
      height: 50px;
      padding-right: 50px;
      margin-right: 20px;
      color: $colorFontSubtle;
    }

    .fa-calendar {
      margin-right: 11px;
      margin-left: 9px;
    }
  }
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5em;
  text-align: center;
  h3 {
    @extend %heading-2;

    @media screen and (min-width: $desktop) {
      font-size: 2vw;
    }

    color: rgba(#363837, 1);
  }
  i {
    font-size: 5rem;
    margin-bottom: 0.5em;
    color: $colorPrimary;
  }
}
</style>
