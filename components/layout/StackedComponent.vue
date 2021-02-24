<template>
  <section
    class="stacked-component"
    :class="[
      theme,
      {
        spacing: spacing,
        topo: topo,
        'spacing-large': spacingLarge,
        'background-image': backgroundImage,
        'no-effect': noEffect,
      },
    ]"
  >
    <theme :theme="theme" :topo="topo" class="component-inner">
      <slot></slot>
    </theme>
  </section>
</template>

<script>
import Theme from '../patterns/Theme';
import {themeProps} from '../../mixins/sharedProps';
/**
 * Defines a consistent spacing structure around flexible component groups that
 * that can have various themes.  Different spacing for different theme combinations
 */

export default {
  name: 'StackedComponent',
  components: {Theme},
  mixins: [themeProps],
  props: {
    spacing: {
      type: Boolean,
      default: false,
    },
    spacingLarge: {
      type: Boolean,
      default: false,
    },
    backgroundImage: {
      type: Boolean,
      default: false,
    },
    noEffect: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.stacked-component {
  position: relative;
  z-index: $slices-z-index;

  &.spacing,
  &.spacing-large {
    &.light + .light:not(.topo),
    &.light + .transparent,
    &.light + .no-effect + .spacing.light:not(.topo),
    &.light + .no-effect + .spacing.transparent,
    &.transparent + .light:not(.topo),
    &.transparent + .transparent {
      .component-inner {
        padding-top: 0;
      }
    }
  }

  &.spacing {
    .component-inner {
      @include componentSpacing;
    }
  }

  &.spacing-large {
    .component-inner {
      @include componentSpacingLarge;
    }
  }

  &.background-image {
    z-index: $slice-images-z-index;
  }
}
</style>
