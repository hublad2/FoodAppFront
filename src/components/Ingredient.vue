<template>
  <div>
    <div class="ingredients" v-if="edamamId">
      <img :src="photo" />
      <p>{{ description }}</p>
    </div>
    <div class="ingredients edamam-false" v-if="!edamamId">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ingredient",
  props: {
    itemIngredient: {
      type: [Object, String],
      required: true,
    },
    edamamId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      photo: null,
      description: null,
    };
  },
  created() {
    /* Behaviour of Ingredient component changes, depending if the recipe was created by user or not */
    if (this.edamamId) {
      this.photo = this.itemIngredient.image;
      this.description = this.itemIngredient.text;
    } else {
      this.description = this.itemIngredient;
    }
  },
};
</script>

<style lang="scss" scoped>
.ingredients {
  display: flex;
  padding-bottom: 10px;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;

    @media screen and (min-width: 500px) {
      width: 20vw;
      height: 20vw;
      border-radius: 10vw;
    }

    @media screen and (min-width: 750px) {
      width: 100px;
      height: 100px;
    }
  }

  p {
    margin-left: 1.5em;
    font-size: 1.8rem;
  }
}

.edamam-false {
  p {
    margin-left: 0;
  }
}
</style>
