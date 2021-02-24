<template>
  <zr-input v-bind="$props" class="base-input" @input="updateValue"></zr-input>
</template>

<script>
import {ZrInput} from '@zaneray/vue-components';

/**
 * Input component that leverages the ZaneRay Input component documented at https://zr-vue.netlify.com/#/Base%20Components/ZrInput
 */

export default {
  name: 'BaseTextInput',
  components: {ZrInput},
  extends: ZrInput,
  methods: {
    updateValue(event) {
      this.$emit('input', event);
    }
  }
};
</script>

<style scoped lang="scss">
.base-input.base-input /deep/ {
  margin: 0;

  input {
    @include formInput;

    &:focus {
      background-color: $color-white;
    }
  }

  label {
    @include formLabel;

    margin-bottom: $spacing-50;
  }
}
</style>

<docs>
    ### Examples
    ```jsx
    <base-text-input id="test" label="Test"></base-text-input>
    ```
</docs>
