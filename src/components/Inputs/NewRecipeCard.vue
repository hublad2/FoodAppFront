<template>
  <div class="card-wrapper">
    <h3 class="card-wrapper_header">{{ header }}</h3>
    <AddElement
      v-if="mode"
      @send-to-parent="handleSubmit"
      :value="value"
      :inputMode="mode"
    />
    <AddElement
      v-if="!mode"
      @send-to-parent="handleSubmit"
      :value="value"
      :inputMode="mode"
      @click.native="mode = !mode"
    />
    <ul
      v-if="savedValues.length > 0 && type == 'ingredients'"
      class="card-wrapper_list"
    >
      <li :key="index" v-for="(value, index) in savedValues">
        {{ `${value}` }}
      </li>
    </ul>
    <ul
      v-if="savedValues.length > 0 && type == 'preparation'"
      class="card-wrapper_list preparation"
    >
      <RecipeStep
        :key="index"
        v-for="(value, index) in savedValues"
        :step="value"
        :index="index"
      />
    </ul>
  </div>
</template>

<script>
import AddElement from "./AddElement";
import RecipeStep from "@/components/Recipe/RecipeStep";

export default {
  name: "NewRecipeCard",
  components: {
    AddElement,
    RecipeStep,
  },
  data() {
    return {
      mode: false,
      savedValues: [],
    };
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    initialValues: {
      type: Array,
    },
    type: {
      type: String,
      required: true,
    },
  },
  created() {
    if (this.initialValues != null) this.savedValues = this.initialValues;
  },
  methods: {
    handleSubmit(value) {
      if (value !== undefined && value !== null && value != "") {
        this.$emit("send-to-parent", value);
        this.savedValues.push(value);
        this.mode = !this.mode;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  @extend %elevation;
  @extend %text-gray;
  width: 100%;
  padding: 2em;

  &_header {
    @extend %heading-5;
    margin-bottom: 1em;
  }

  &_list {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: auto;
    background: none;
    border: 1px solid rgba(#979797, 0.5);
    border-radius: 8px;
    color: $colorFontPrimary;
    font-size: 1.6rem;

    @media screen and (min-width: $tablet) {
      grid-template-columns: 1fr 1fr;
    }

    li {
      padding: 1em;
    }
  }
}

.preparation {
  grid-template-columns: 1fr;

  li {
    padding: 1em 1em 0 1em;
  }
}
</style>
