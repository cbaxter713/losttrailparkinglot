<template>
  <div :class="['container',  {
        'content-width': content,
        'text-block-width': textBlock,
        disabled: disabled
      }]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer',
  props: {
    content: {
      type: Boolean,
      default: false
    },
    textBlock: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  @include containerLayout;

  &.disabled {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
  }
}
</style>
