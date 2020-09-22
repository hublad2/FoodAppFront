<template>
  <div class="create-wrapper">
    <header class="create-wrapper_header">
      <i class="fas fa-scroll"></i>
      <span>Edytuj przepis</span>
      <span>{{ title }}</span>
    </header>
    <section class="create-wrapper_form">
      <form @submit.prevent class="form">
        <div class="form-input">
          <label class="form-input_label" for="description2">Opis</label>
          <textarea
            id="description2"
            rows="4"
            cols="50"
            class="form-input_input"
            placeholder="Krótki opis"
            v-model.trim="updateForm.description"
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
            v-model.trim="updateForm.ingredients"
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
            v-model.trim="updateForm.preparations"
            placeholder="Sposób przygotowania"
          >
          </textarea>
        </div>
        <div class="form-input">
          <label class="form-input_label" for="photo2">Zjdęcie</label>
          <input
            id="photo2"
            class="form-input_input"
            accept="image/*"
            name="photo2"
            type="file"
            @change="initPreview()"
          />
        </div>
        <img
          v-if="previewOpen"
          :src="previewPhoto"
          id="previewImage"
          class="form-input_preview"
        />
        <button @click="fetchUpdateRecipe()" class="button">Zapisz</button>
        <router-link to="/list" tag="button" class="button">Powrót</router-link>
      </form>
    </section>
  </div>
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js";
import "@yaireo/tagify/dist/tagify.css";

export default {
  name: "Update",
  data() {
    return {
      updateForm: {
        description: "",
        ingredients: [],
        preparations: "",
      },
      title: null,
      previewPhoto: null,
      previewOpen: false,
    };
  },
  created() {
    this.updateForm.preparations = this.$store.state.currentRecipe.preparation;
    this.title = this.$store.state.currentRecipe.title;
    this.updateForm.description = this.$store.state.currentRecipe.description;
    this.previewPhoto = this.$store.state.currentRecipe.photo;
    this.previewOpen = true;
  },
  mounted() {
    const input = document.querySelector("textarea[name=ingredients2]");
    let ingredients = new Tagify(input, {
      enforceWhitelist: false,
      delimiters: null,
    });

    ingredients.on("add", (e) => {
      this.updateForm.ingredients.push(e.detail.data.value);
    });

    ingredients.on("remove", (e) => {
      this.updateForm.ingredients = this.updateForm.ingredients.filter(
        (ingredient) => ingredient != e.detail.data.value
      );
    });

    this.$store.state.currentRecipe.ingredients.forEach((ingredient) => {
      ingredients.addTags(ingredient);
    });
    console.log(ingredients.value);
  },
  methods: {
    checkIfOkToSend() {
      if (
        this.updateForm.name != "" &&
        this.updateForm.ingredients.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    initPreview() {
      const imageUploader = document.querySelector("#photo2");
      this.previewPhoto = URL.createObjectURL(imageUploader.files[0]);
      this.previewOpen = true;
    },
    getDataUrl(img) {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Set width and height
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/jpeg");
    },
    runImg() {
      let dataUrl = "";
      if (this.previewOpen) {
        const img = document.querySelector("#previewImage");
        dataUrl = this.getDataUrl(img);
      }
      return dataUrl;
    },
    async fetchUpdateRecipe() {
      //Run only if the user selected image to send
      if (this.checkIfOkToSend()) {
        const dataUrl = this.runImg();

        try {
          let results = await fetch("http://localhost:3000/recipes/update", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.userProfile.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.title,
              description: this.updateForm.description,
              ingredients: this.updateForm.ingredients,
              preparation: this.updateForm.preparations,
              photo: dataUrl,
              userId: this.$store.state.userProfile.user._id,
            }),
          });
          let resultsJSON = await results.json();
          console.log(resultsJSON);
        } catch (err) {
          alert("Something went wrong");
          console.log(err);
        }
      } else {
        alert("Wypelnij Składniki");
      }
    },
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

  @media screen and (min-width: 750px) {
    max-width: 1000px;
    padding: 50px;
  }

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

  .tagify__input::before {
    /* Chrome/Opera/Safari */
    white-space: pre-line;
    position: absolute;
    top: 5px;
  }
}

.form-input {
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  &_label {
    @extend %regular-text;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &_input {
    @extend %regular-text;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  ::-webkit-input-placeholder {
    padding: 5px 0 0 5px;
  }

  &_single-line {
    height: 40px;
  }

  &_preview {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
}
</style>
