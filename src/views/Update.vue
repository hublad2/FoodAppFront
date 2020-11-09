<template>
  <div class="create-wrapper">
    <nav class="create-wrapper_nav nav">
      <router-link to="/list" class="nav_container">
        <i class="fas fa-angle-left nav_icon-link"></i>
        <BaseButton :class="'nav-button'" :value="'Powrót'" />
      </router-link>
    </nav>
    <header class="create-wrapper_header">
      <span>Edytuj przepis</span>
    </header>
    <section class="create-wrapper_form">
      <form @submit.prevent class="form">
        <div class="form-wrapper">
          <div class="form-container photo-input">
            <label for="photo2"><i class="fas fa-image"></i></label>
            <input
              id="photo2"
              class="form-container_input form-input_input"
              accept="image/*"
              name="photo2"
              type="file"
              @change="initPreview()"
            />
          </div>
          <div class="form-container name-input">
            <h2 class="name-input_header" for="name2">
              {{ updateForm.name }}
            </h2>
          </div>
        </div>
        <img
          v-if="previewOpen"
          :src="previewPhoto"
          id="previewImage"
          class="form-input_preview"
        />
        <NewRecipeCard
          :header="'Składniki'"
          :value="'Dodaj składnik'"
          :inputName="'ingredients'"
          :initialValues="updateForm.ingredients"
          :type="'ingredients'"
          @sendToParent="(e) => updateValue('ingredients', e)"
        />
        <NewRecipeCard
          :header="'Przygotowanie'"
          :value="'Dodaj etap'"
          :inputName="'preparation'"
          :initialValues="updateForm.preparations"
          :type="'preparation'"
          @sendToParent="(e) => updateValue('preparations', e)"
        />
        <div class="form-container form-input">
          <label class="form-container--label" for="description2">Opis</label>
          <textarea
            id="description2"
            rows="4"
            cols="50"
            class="form-container_input form-input_input"
            placeholder="Krótki opis"
            v-model.trim="updateForm.description"
          >
          </textarea>
        </div>
        <div v-if="previewOpen" class="progress-container">
          <h4>Status wysyłania:</h4>
          <progress value="0" max="100" id="progress-bar"></progress>
        </div>
        <BaseButton :value="'Zapisz'" @click.native="fetchUpdateRecipe()" />
      </form>
    </section>
  </div>
</template>

<script>
import { storage } from "../firebase";
import NewRecipeCard from "@/components/Inputs/NewRecipeCard";
import BaseButton from "@/components/Button/BaseButton";

export default {
  name: "Update",
  components: {
    BaseButton,
    NewRecipeCard,
  },
  data() {
    return {
      updateForm: {
        name: "",
        description: "",
        ingredients: [],
        preparations: [],
      },
      photo: null,
      photoURL: null,
      previewPhoto: null,
      previewOpen: false,
    };
  },
  created() {
    this.updateForm.preparations = this.$store.state.currentRecipe.preparation;
    this.updateForm.name = this.$store.state.currentRecipe.title;
    this.updateForm.ingredients = this.$store.state.currentRecipe.ingredients;
    this.updateForm.description = this.$store.state.currentRecipe.description;
    this.previewPhoto = this.$store.state.currentRecipe.photo;
    this.previewOpen = true;
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
      this.photo = imageUploader.files[0];
      this.previewPhoto = URL.createObjectURL(imageUploader.files[0]);
      this.previewOpen = true;
    },
    UploadImgToFirebase(img) {
      let progressBar = document.querySelector("#progress-bar");
      let storageRef = storage.ref(this.updateForm.name);
      let task = storageRef.put(img);

      return new Promise((resolve) => {
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

          function complete() {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              resolve(downloadURL);
            });
          }
        );
      });
    },
    async fetchUpdateRecipe() {
      //Run only if the user selected image to send
      if (this.checkIfOkToSend()) {
        this.photoURL = await this.UploadImgToFirebase(this.photo);

        try {
          let results = await fetch(
            "https://hidden-cliffs-64077.herokuapp.com/recipes/update",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.$store.state.userProfile.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: this.updateForm.name,
                description: this.updateForm.description,
                ingredients: this.updateForm.ingredients,
                preparation: this.updateForm.preparations,
                photo: this.photoURL,
                userId: this.$store.state.userProfile.user._id,
              }),
            }
          );
          let resultsJSON = await results.json();
          console.log(resultsJSON);
          this.$router.push("List");
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

<style lang="scss" scoped>
@import "@/scss/create-update.scss";

.nav {
  &_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  &_icon-link {
    font-size: 3.5rem;
    color: #363837;
  }

  &_icon-action {
    font-size: 3rem;
    color: $colorPrimary;
  }
}

.form-container {
  display: flex;
  flex-direction: column;

  &_input {
    @extend %text-gray;
    background: #ffffff;
  }

  &--label {
    @extend %heading-5;
    margin-bottom: 10px;
  }
}

.name-input {
  flex-direction: column;
  padding: 0 2em;
  flex: 1;
  justify-content: center;

  &_header {
    @extend %heading-4;
  }
}
</style>
