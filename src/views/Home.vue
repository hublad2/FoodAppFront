<template>
  <div class="home-wrapper">
    <div class="home-wrapper_background"></div>
    <div class="home-wrapper_header header">
      <i class="fas fa-egg header_icon"></i>
      <header class="header_primary">Kuchnio Zarządzacz</header>
      <h2 class="header_secondary">
        Aplikacja ułatwiająca organizację w kuchni.
      </h2>
      <BaseLink class="header_button" :value="'Wypróbuj'" :target="'/list'" />
    </div>
    <div class="home-wrapper_list list">
      <ul>
        <li class="list_item">
          <i class="fas fa-scroll"></i>
          <span>Twórz przepisy</span>
        </li>
        <li class="list_item">
          <i class="fas fa-search"></i>
          <span>Szukaj przepisów</span>
        </li>
        <li class="list_item">
          <i class="fas fa-calendar"></i>
          <span class="calendar">Organizuj przepisy w kalendarzu</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseLink from "../components/Button/BaseLink";
export default {
  name: "Home",
  components: {
    BaseLink,
  },
};
</script>

<style lang="scss">
.home-wrapper {
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

  @media screen and (min-width: $tablet) {
    flex-direction: row;
    max-width: 100vw;
    height: 100vh;
    justify-content: center;
  }

  &_header {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 750px) {
      align-items: flex-start;
    }
  }

  i {
    color: $colorPrimary;
  }

  &_list {
    height: 50%;
    width: 90%;
    @extend %elevation;
    margin-top: 10px;
    max-width: 400px;
    max-height: 600px;

    @media screen and (min-width: 750px) {
      max-width: 100vw;
      max-height: 100vh;
      height: 70vh;
      width: 45vw;
    }

    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 6% 3% 6% 13%;
    }
  }

  &_background {
    background: url("../assets/photo-1.jpeg");
    opacity: 0.2;
    filter: alpha(opacity=20);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}

.header {
  @media screen and (min-width: $tablet) {
    padding: 0 50px;
  }
  &_icon {
    font-size: 5rem;

    @media screen and (min-width: $tablet) {
      display: none !important;
    }
  }

  &_primary {
    @extend %heading-1;
    margin-top: 30px;
    text-align: center;

    @media screen and (min-width: $tablet) {
      text-align: left;
      font-size: 5rem;
      width: 25vw;
    }
  }

  &_secondary {
    @extend %text-subtle;
    font-size: 2rem;
    text-align: center;
    margin-top: 20px;
    width: 300px;

    @media screen and (min-width: $tablet) {
      text-align: left;
      width: 40vw;
      font-size: 2.5rem;
    }
  }

  &_button {
    margin-top: 25px;
  }
}

.list {
  &_item {
    display: flex;
    align-items: center;
    margin: 30px 0px;

    i {
      font-size: 4.4rem;

      :first-of-type {
        margin-right: 20px;
      }

      @media screen and (min-width: $tablet) {
        font-size: 7rem;
      }

      @media screen and (min-width: 1250px) {
        font-size: 8rem;
      }
    }

    span {
      @extend %text-gray;
      font-size: 2.5rem;
      margin-left: 12%;
      justify-self: flex-end;

      @media screen and (min-width: $tablet) {
        margin-left: 20%;
      }

      @media screen and (min-width: 1250px) {
        font-size: 4rem;
      }
    }
  }
}
</style>
