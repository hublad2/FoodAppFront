<template>
  <div class="home-wrapper">
    <i class="fas fa-egg home-wrapper_header-icon"></i>
    <header class="home-wrapper_header-primary">Kuchnio Zarządzacz</header>
    <h2 class="home-wrapper_header-secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
      auctor nunc.
    </h2>
    <router-link to="/entry" tag="button" class="home-wrapper_button"
      >Wypróbuj</router-link
    >
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
    margin-top: 30px;
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
    height: 50%;
    width: 90%;
    background-color: $colorBackground2;
    padding: 10%;
    margin-top: 50px;
    max-width: 400px;
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

.calendar {
  margin-left: 15% !important;
}
</style>
