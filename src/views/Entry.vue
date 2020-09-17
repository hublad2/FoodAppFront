<template>
  <div class="entry-wrapper">
    <i class="fas fa-egg entry-wrapper_header-icon"></i>
    <header class="entry-wrapper_header">
      Kuchnio zarządzacz
    </header>
    <section class="entry-wrapper_search your">
      <div class="your_item">
        <i class="fas fa-search"></i>
        <router-link to="/search" tag="button" class="button"
          >Wyszukaj</router-link
        >
      </div>
    </section>
    <div class="entry-wrapper_spacer"><span>Twoje przepisy</span></div>
    <section class="entry-wrapper_your your">
      <div class="your_item">
        <i class="fas fa-scroll"></i>
        <router-link to="/list" tag="button" class="button">Lista</router-link>
      </div>
      <div class="your_item">
        <i class="fas fa-calendar"></i>
        <router-link to="/calendar" tag="button" class="button"
          >Kalendarz</router-link
        >
      </div>
    </section>
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

  &_header {
    @extend %header-text;
    margin-top: 30px;
  }

  i {
    color: $colorFont1;
    text-align: center;
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

.button {
  @extend %green-button;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
</style>
