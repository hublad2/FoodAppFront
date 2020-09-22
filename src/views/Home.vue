<template>
  <div class="home-wrapper">
    <div class="home-wrapper_header header">
      <i class="fas fa-egg header_icon"></i>
      <header class="header_primary">Kuchnio Zarządzacz</header>
      <h2 class="header_secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
        auctor nunc.
      </h2>
      <router-link to="/entry" tag="button" class="header_button"
        >Wypróbuj</router-link
      >
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
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

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

  @media screen and (min-width: 750px) {
    flex-direction: row;
    max-width: 100vw;
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
    color: $colorFont1;
  }

  &_list {
    height: 50%;
    width: 90%;
    background-color: $colorBackground2;
    margin-top: 50px;
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
}

.header {
  @media screen and (min-width: 750px) {
    padding: 0 50px;
  }
  &_icon {
    font-size: 5rem;

    @media screen and (min-width: 750px) {
      display: none;
    }
  }

  &_primary {
    @extend %header-text;
    margin-top: 30px;

    @media screen and (min-width: 750px) {
      text-align: left;
      font-size: 5rem;
      width: 25vw;
    }
  }

  &_secondary {
    @extend %regular-text;
    text-align: center;
    margin-top: 30px;
    width: 260px;

    @media screen and (min-width: 350px) {
      width: 40vw;
      font-size: 2.5rem;
    }

    @media screen and (min-width: 750px) {
      text-align: left;
    }
  }

  &_button {
    @extend %green-button;
    margin-top: 50px;
  }
}

.list {
  &_item {
    display: flex;
    align-items: center;
    margin: 30px 0px;

    i {
      font-size: 4.4rem;

      @media screen and (min-width: 750px) {
        font-size: 7rem;
      }

      @media screen and (min-width: 1250px) {
        font-size: 8rem;
      }
    }

    span {
      @extend %green-text;
      font-size: 2.5rem;
      margin-left: 12%;
      justify-self: flex-end;

      @media screen and (min-width: 750px) {
        font-size: 3rem;
        margin-left: 20%;
      }

      @media screen and (min-width: 1250px) {
        font-size: 5rem;
      }
    }
  }
}
</style>
