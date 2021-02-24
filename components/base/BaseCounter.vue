<template>
  <zr-counter v-bind="$props" @input="updateValue"></zr-counter>
</template>

<script>
import {ZrCounter} from '@zaneray/vue-components';

/**
 * This base checkbox component leverages the ZaneRay UI Pantry checkbox document at https://zr-vue.netlify.com/#/ZrCheckbox
 */

export default {
  name: 'BaseCounter',
  components: {
    ZrCounter
  },
  extends: ZrCounter,
  methods: {
    updateValue(value) {
      this.$emit('change', value);
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .counter-wrapper {
  .total {
    height: auto;
    width: $spacing-200;
    font-size: $spacing-100;
    border: none;

    @media (min-width: $screen-sm) {
      width: $spacing-250;
    }
  }

  .stepper {
    width: $spacing-150;
    background-color: $color-gray-100;
    font-size: $spacing-75;
    color: $base-type-color;
    transition: background-color $transition-base;

    &:hover {
      background-color: $color-gray-200;
    }
  }
}
</style>

<docs>
  ### Examples

  #### Counter with min && value
  ```jsx
  <BaseCounter :min="1" :value="1"></BaseCounter>
  ```
</docs>
