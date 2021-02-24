<template>
  <button
    class="masthead-nav-toggle"
    :class="{active: navActive}"
    aria-haspopup="true"
    aria-label="Open Navigation"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  name: 'BaseNavigationToggle',
  props: {
    /**
     * Adds the class "active" to the button when true.
     */
    navActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.masthead-nav-toggle {
  width: $spacing-225;
  height: $spacing-225;
  position: relative;
  background: none;
  border: 0;
  -webkit-appearance: none;
  transform: translateX(4px);

  span {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    top: 8px;
    background-color: $color-white;
    border-radius: 2px;
    transition: top 0.3s ease-out 0.2s, transform 0.3s ease-out 0s,
      background-color $transition-base;

    .masthead-text-reversed & {
      background-color: $base-type-color;
    }

    &:nth-child(2) {
      top: 18px;
      right: 38.89%;
    }

    &:nth-child(3) {
      top: 28px;
      right: 16.67%;
    }
  }

  &.active {
    span {
      transition: top 0.3s ease-out, transform 0.3s ease-out 0.2s;
      right: 0;
    }

    span:nth-child(1) {
      top: 18px;
      transform: rotate(45deg);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      top: 18px;
      transform: rotate(-45deg);
    }
  }
}
</style>

<docs>

  ### Default is false
  ```jsx
  <BaseNavigationToggle></BaseNavigationToggle>
  ```

  ### Hardcoded to true
  ```jsx
  <BaseNavigationToggle :navActive="true"></BaseNavigationToggle>

</docs>
