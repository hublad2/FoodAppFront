<template>
  <div class="create-wrapper">
    <nav class="create-wrapper_nav nav">
      <router-link to="/list" class="nav_container">
        <i class="fas fa-angle-left nav_icon-link"></i>
        <BaseButton :class="'nav-button'" :value="'Powrót'" />
      </router-link>
    </nav>
    <header class="create-wrapper_header">
      <h1>Stwórz przepis</h1>
    </header>
    <section class="create-wrapper_form">
      <form @submit.prevent class="form">
        <div class="form-wrapper">
          <div class="form-container photo-input">
            <label class="form-container_label form-input_label" for="photo2"
              ><i class="fas fa-image"></i
            ></label>
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
            <label class="form-container_label name-input_label" for="name2"
              >Nazwa</label
            >
            <input
              class="form-container_input name-input_input name-input_single-line"
              v-model.trim="createForm.name"
              type="text"
              placeholder="Nazwa przepisu"
              id="name2"
              name="name2"
              required
            />
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
          :type="'ingredients'"
          @send-to-parent="(e) => updateValue('ingredients', e)"
        />
        <NewRecipeCard
          :header="'Przygotowanie'"
          :value="'Dodaj etap'"
          :inputName="'preparation'"
          :type="'preparation'"
          @send-to-parent="(e) => updateValue('preparations', e)"
        />
        <div class="form-container form-input">
          <label
            class="form-container_label form-input_label"
            for="description2"
            >Opis</label
          >
          <textarea
            id="description2"
            rows="4"
            cols="50"
            class="form-container_input form-input_input"
            placeholder="Krótki opis"
            v-model.trim="createForm.description"
          >
          </textarea>
        </div>
        <div v-if="previewOpen" class="progress-container">
          <h4>Status wysyłania:</h4>
          <progress value="0" max="100" id="progress-bar"></progress>
        </div>
        <BaseButton :value="'Zapisz'" @click.native="fetchCreateRecipe()" />
      </form>
    </section>
  </div>
</template>

<script>
import { storage } from "../firebase";
import NewRecipeCard from "@/components/Inputs/NewRecipeCard";
import BaseButton from "@/components/Button/BaseButton";

export default {
  name: "Create",
  components: {
    NewRecipeCard,
    BaseButton,
  },
  data() {
    return {
      createForm: {
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
      let storageRef = storage.ref(this.createForm.name);
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
    async fetchCreateRecipe() {
      //Run only if the user selected image to send
      if (this.checkIfOkToSend()) {
        this.photoURL = await this.UploadImgToFirebase(this.photo);

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
                photo: this.photoURL,
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
    updateValue(inputName, value) {
      this.createForm[inputName].push(value);
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

  &_label {
    @extend %heading-5;
    margin-bottom: 10px;
  }

  &_input {
    @extend %text-gray;
    background: #ffffff;
  }
}

.name-input {
  flex-direction: column;
  padding: 0 2em;
  flex: 1;

  &_input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  &_single-line {
    height: 40px;
  }
}
</style>
