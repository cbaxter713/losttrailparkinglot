<template>
  <hr class="divider" :class="`divider-${size} divider-${theme}`" />
</template>

<script>
export default {
  name: 'BaseDivider',
  props: {
    /**
     * the size of the diver. Options: 100, 200, 300
     */
    size: {
      type: String,
      default: '100',
      validator: function(val) {
        return ['100', '200', '300'].includes(val);
      }
    },
    /**
     * the theme of the divider. Options light, medium, dark
     */
    theme: {
      type: String,
      default: 'dark',
      validator: function(val) {
        return ['dark', 'light', 'gray', 'dotted'].includes(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.divider {
  margin: $spacing-100 0;
  border-top: 1px solid $color-gray-1000;
  border-right: none;
  border-bottom: none;
  border-left: none;

  &-200 {
    border-width: 2px;
  }

  &-300 {
    border-width: 4px;
  }

  &-gray {
    border-color: $color-gray-200;
  }

  &-light {
    border-color: $color-white;
  }

  &-dotted {
    border-top: 1px dashed $color-gray-1000;
  }
}
</style>

<docs>
  ### Examples

  #### Size: 100 Dividers
  ```jsx
  <base-divider></base-divider>
  <base-divider theme="gray"></base-divider>
  <base-divider theme="dotted"></base-divider>
  <div style="background-color: black; padding: 20px 0;">
    <base-divider theme="light"></base-divider>
  </div>
  ```

  #### Size: 200 Dividers
  ```jsx
  <base-divider size="200"></base-divider>
  <base-divider size="200" theme="gray"></base-divider>
  <base-divider size="200" theme="dotted"></base-divider>
  <div style="background-color: black; padding: 20px 0;">
    <base-divider size="200" style="margin-bottom: 10px;" theme="light"></base-divider>
  </div>
  ```

  #### Size: 300 Dividers
  ```jsx
  <base-divider size="300"></base-divider>
  <base-divider size="300" theme="gray"></base-divider>
  <base-divider size="300" theme="dotted"></base-divider>
  <div style="background-color: black; padding: 20px 0;">
    <base-divider size="300" theme="light"></base-divider>
  </div>
  ```
</docs>
