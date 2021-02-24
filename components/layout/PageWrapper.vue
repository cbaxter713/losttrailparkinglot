<template>
  <div class="page-wrapper" :class="{'below-masthead': belowMasthead, spacing: spacing}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageWrapper',
  props: {
    belowMasthead: {
      type: Boolean,
      default: false
    },
    spacing: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.page-wrapper {
  position: relative;
  width: 100%;
  z-index: $main-page-z-index;
  background-color: $color-white;

  &.spacing {
    @include pageSpacing;
  }

  &.below-masthead {
    z-index: $below-masthead-content-z-index;
    padding-top: $header-height-sm;

    &.spacing {
      padding-top: calc(#{$header-height-sm} + #{$page-spacing-mobile});
    }

    @media (min-width: $navigation-breakpoint) {
      padding-top: $header-height;

      &.spacing {
        padding-top: calc(#{$header-height} + #{$page-spacing-desktop});
      }
    }
  }
}
</style>
