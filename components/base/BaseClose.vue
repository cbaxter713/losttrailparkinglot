<template>
  <button class="close" aria-label="Close" title="Close">
    <base-icon icon="close"></base-icon>
  </button>
</template>

<script>
import BaseIcon from './BaseIcon';
export default {
  name: 'BaseClose',
  components: {BaseIcon}
};
</script>

<style scoped lang="scss">
.close {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-white;
  width: $spacing-225;
  height: $spacing-225;
  background-color: rgba($color-gray-100, 0.6);

  &:focus,
  &:active {
    outline: none;
  }

  /deep/ svg {
    height: $spacing-125;
    width: $spacing-125;
    fill: $base-type-color;
  }
}
</style>

<docs>
```jsx
<base-close />
<icon-definitions />
```
</docs>
