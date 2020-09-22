<template>
  <div class="entry-bg-wrapper">
    <div class="entry-wrapper">
      <i class="fas fa-egg entry-wrapper_header-icon"></i>
      <header class="entry-wrapper_header">
        Kuchnio zarządzacz
      </header>
      <section class="entry-wrapper_search your">
        <div class="your_item">
          <i class="fas fa-search"></i>
          <router-link to="/search" tag="button" class="button-entry"
            >Wyszukaj</router-link
          >
        </div>
      </section>
      <div class="entry-wrapper_spacer"><span>Twoje przepisy</span></div>
      <section class="entry-wrapper_your your">
        <div class="your_item">
          <i class="fas fa-scroll"></i>
          <router-link to="/list" tag="button" class="button-entry"
            >Lista</router-link
          >
        </div>
        <div class="your_item">
          <i class="fas fa-calendar"></i>
          <router-link to="/calendar" tag="button" class="button-entry"
            >Kalendarz</router-link
          >
        </div>
      </section>
    </div>
    <div class="background-entry"></div>
  </div>
</template>

<script>
export default {
  name: "Entry",
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.entry-bg-wrapper {
  @media screen and (min-width: 750px) {
    display: flex;
    height: 100vh;
  }

  .background-entry {
    @media screen and (min-width: 750px) {
      flex: 1;
      background-color: $colorBackground3;
    }
  }
}

.entry-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  min-height: 800px;
  padding: 30px 20px;

  @media screen and (min-width: 350px) {
    padding: 30px 30px;
  }

  @media screen and (min-width: 750px) {
    width: 750px;
    margin: 0 50px;
    justify-content: center;
  }

  &_header {
    @extend %header-text;
    margin-top: 30px;

    @media screen and (min-width: 750px) {
      font-size: 6rem;
      width: 400px;
      margin: 60px auto 20px auto;
    }
  }

  i {
    color: $colorFont1;
    text-align: center;

    @media screen and (min-width: 750px) {
      font-size: 6rem;
    }
  }

  &_header-icon {
    font-size: 5rem;
  }

  &_search {
    margin-top: 20px;
  }

  &_your {
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    @media screen and (min-width: 750px) {
      margin-bottom: 200px;
    }
  }

  &_spacer {
    @extend %green-text;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #000;
    line-height: 0.1em;
    margin: 20px 0;
    font-size: 1.8rem;

    span {
      background: $colorBackground1;
      padding: 0 10px;
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
      margin-right: 20px;
    }

    .fa-calendar {
    }

    button {
      flex: 1;
    }
  }
}

.button-entry {
  @extend %green-button;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
</style>
