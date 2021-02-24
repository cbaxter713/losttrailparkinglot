<template>
  <div :class="['input-wrapper', {'full-width': full}]">
    <!-- @slot This is where inputs are placed -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * This base input wrapper component leverages the ZaneRay UI Pantry base input wrapper document at https://zr-vue.netlify.com/#/Base%20Components/ZrInputWrapper
 */

export default {
  name: 'BaseInputWrapper',
  props: {
    /**
     * Makes the input wrapper full width instead of contained
     */
    full: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.input-wrapper {
  display: block;
  margin-bottom: $spacing-100;
  width: $input-default-width;

  &.full-width {
    width: 100%;
  }
}
</style>
