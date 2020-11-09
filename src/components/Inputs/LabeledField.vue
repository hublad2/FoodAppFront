<template>
  <div class="native-input">
    <label class="native-input_label" :for="id">{{ label }}</label>
    <input
      class="native-input_input"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: "LabeledField",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.native-input {
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  &_label {
    @extend %text-subtle;
    margin-bottom: 3px;
  }

  &_input {
    background: #ffffff;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
  }
}
</style>
