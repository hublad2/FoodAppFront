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
            required
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
            v-model.trim="createForm.preparations"
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
        <div v-if="previewOpen" class="progress-container">
          <h4>Status wysyłania:</h4>
          <progress value="0" max="100" id="progress-bar"></progress>
        </div>
        <button @click="fetchCreateRecipe()" class="button-create">
          Zapisz
        </button>
        <router-link to="/list" tag="button" class="button-create"
          >Powrót</router-link
        >
      </form>
    </section>
  </div>
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js";
import "@yaireo/tagify/dist/tagify.css";
import { storage } from "../firebase";

export default {
  name: "Create",
  data() {
    return {
      createForm: {
        name: "",
        description: "",
        ingredients: [],
        preparations: "",
      },
      photo: null,
      previewPhoto: null,
      previewOpen: false,
    };
  },
  mounted() {
    const input = document.querySelector("textarea[name=ingredients2]");
    let ingredients = new Tagify(input, {
      enforceWhitelist: false,
      delimiters: null,
    });

    ingredients.on("add", (e) => {
      this.createForm.ingredients.push(e.detail.data.value);
    });

    ingredients.on("remove", (e) => {
      this.createForm.ingredients = this.createForm.ingredients.filter(
        (ingredient) => ingredient != e.detail.data.value
      );
    });

    ingredients.addTags("Składnik");
  },
  methods: {
    checkIfOkToSend() {
      if (
        this.createForm.name != "" &&
        this.createForm.ingredients.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    initPreview() {
      const imageUploader = document.querySelector("#photo2");
      this.photo = imageUploader.files[0];
      this.previewPhoto = URL.createObjectURL(imageUploader.files[0]);
      this.previewOpen = true;
    },
    UploadImgToFirebase(img) {
      let progressBar = document.querySelector("#progress-bar");
      console.log(img);
      let storageRef = storage.ref(this.createForm.name);
      let task = storageRef.put(img);

      task.on(
        "state_changed",

        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          progressBar.value = percentage;
        },

        function error(err) {
          console.log(err);
        },

        function complete() {}
      );
    },
    getDataUrl(img) {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Set width and height
      canvas.width = 300;
      canvas.height = 300;
      // Draw the image
      /* ctx.drawImage(img, 0, 0); */
      ctx.drawImage(img, 0, 0, 300, 300, 0, 0, 300, 300);
      return canvas.toDataURL();
    },
    runImg() {
      let dataUrl = "";
      if (this.previewOpen) {
        const img = document.querySelector("#previewImage");
        dataUrl = this.getDataUrl(img);
      }
      return dataUrl;
    },
    async fetchCreateRecipe() {
      //Run only if the user selected image to send
      if (this.checkIfOkToSend()) {
        const dataUrl = this.runImg();
        this.UploadImgToFirebase(this.photo);

        const updatedIngredients = this.createForm.ingredients.filter(
          (ingredient) => ingredient != "Składnik"
        );

        try {
          let results = await fetch(
            "https://hidden-cliffs-64077.herokuapp.com/recipes/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.$store.state.userProfile.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: this.createForm.name,
                ingredients: updatedIngredients,
                description: this.createForm.description,
                preparation: this.createForm.preparations,
                userId: this.$store.state.userProfile.user._id,
                photo: null,
                edamamId: false,
              }),
            }
          );
          let response = await results.json();
          console.log(response);
          this.$router.push("List");
        } catch (err) {
          alert("Something went wrong");
          console.log(err);
        }
      } else {
        alert("Wypelnij Nazwę i Składniki");
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

    span {
      font-size: 2.6rem;
    }

    i {
      margin-right: 20px;
    }
  }
}

.button-create {
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

.progress-container {
  margin-top: 20px;

  h4 {
    @extend %regular-text;
    font-weight: bold;
  }
  #progress-bar {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    appearance: none;
  }
}
</style>
