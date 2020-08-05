<template>
  <div class="create-wrapper">
    <header class="create-wrapper_header">
      <i class="fas fa-scroll"></i>
      <span>Stwórz przepis</span>
    </header>
    <section class="create-wrapper_form">
      <form @submit.prevent class="form">
        <div class="form-input">
          <label class="form-input_label" for="name2">Nazwa</label>
          <input
            class="form-input_input form-input_single-line"
            v-model.trim="createForm.name"
            type="text"
            placeholder="Nazwa przepisu"
            id="name2"
            name="name2"
            data-role="taginput"
          />
        </div>
        <div class="form-input">
          <label class="form-input_label" for="description2">Opis</label>
          <textarea
            id="description2"
            rows="4"
            cols="50"
            class="form-input_input"
            placeholder="Krótki opis"
            v-model.trim="createForm.description"
          >
          </textarea>
        </div>
        <div class="form-input">
          <label class="form-input_label" for="description2">Składniki</label>
          <textarea
            id="ingredients2"
            rows="4"
            cols="50"
            class="custom-input"
            name="ingredients2"
            v-model.trim="createForm.ingredients"
            placeholder="Wpisz składnik i wciśnij enter"
          ></textarea>
        </div>
        <div class="form-input">
          <label class="form-input_label" for="description2"
            >Przygotowanie</label
          >
          <textarea
            id="preparation2"
            rows="15"
            cols="50"
            class="form-input_input"
            v-model.trim="createForm.preparation"
            placeholder="Sposób przygotowania"
          >
          </textarea>
        </div>
        <button class="button">Zapisz</button>
      </form>
    </section>
  </div>
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js";
import "@yaireo/tagify/dist/tagify.css";

export default {
  name: "Create",
  data() {
    return {
      createForm: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    const input = document.querySelector("textarea[name=ingredients2]");
    let ingredients = new Tagify(input, {
      enforceWhitelist: false,
      delimiters: null,
    });

    ingredients.addTags("Składnik");
  },
};
</script>

<style lang="scss">
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.create-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  max-width: 80%;
  min-height: 800px;
  padding: 50px 0;

  &_header {
    @extend %header-text;

    i {
      margin-right: 20px;
    }
  }
}

button {
  @extend %green-button;
  width: 100%;
  margin: 50px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-input {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  @extend %regular-text;
}

.form-input {
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  &_label {
    @extend %regular-text;
    font-weight: bold;
    margin-bottom: 3px;
  }

  &_input {
    @extend %regular-text;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  &_single-line {
    height: 40px;
  }
}
</style>
