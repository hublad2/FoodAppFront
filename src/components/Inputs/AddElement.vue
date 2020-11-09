<template>
  <div class="add-element-wrapper">
    <i v-if="!inputMode" class="fas fa-plus nav_icon-action"></i>
    <label v-if="!inputMode" class="add-element-wrapper_paragraph">{{
      value
    }}</label>
    <input
      v-if="inputMode"
      type="text"
      :name="inputName"
      :id="inputName"
      v-model="inputValue"
    />
    <div @click="handleSubmit" class="add-element-wrapper_add" v-if="inputMode">
      <i class="fas fa-plus nav_icon-action"></i>
      <BaseButton :value="'Dodaj'" :class="'action-button'" />
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/Button/BaseButton";

export default {
  name: "AddElement",
  components: {
    BaseButton,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    inputMode: {
      type: Boolean,
    },
    inputName: {
      type: String,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("send-to-parent", this.inputValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-element-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  background: none;
  border: 1px solid rgba(#979797, 0.5);
  border-radius: 8px;
  color: $colorFontPrimary;
  font-size: 1.6rem;
  cursor: pointer;

  i {
    margin-left: 1em;
    cursor: pointer;
  }

  &_paragraph {
    margin-left: 0.7em;
    cursor: pointer;
  }

  input {
    font-size: 1.6rem;
    color: $colorFontPrimary;
    margin-left: 1em;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  input:focus {
    outline: none;
  }

  &_add {
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: $colorPrimary;
    }
  }
}
</style>
