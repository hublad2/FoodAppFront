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
@import "../scss/_variables.scss";
@import "../scss/_extensions.scss";

.ingredients {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.25);
  align-items: center;

  img {
    width: 100px;
    height: 100px;

    @media screen and(min-width:500px) {
      width: 20vw;
      height: 20vw;
    }

    @media screen and(min-width:750px) {
      width: 100px;
      height: 100px;
    }
  }
  p {
    @extend %regular-text;
    padding: 0 30px;
    @media screen and(min-width:500px) {
      font-size: 3.5vw;
    }
    @media screen and(min-width:750px) {
      font-size: 2rem;
    }
  }
}

.edamam-false {
  p {
    padding: 0 20px;
  }
}
</style>
