<template>
  <div
    class="overflow-scroller"
    :class="{
      intersected,
      slim,
      snap: snapPoints,
      'scroll-animation': scrollAnimation,
      'light-scrollbar': scrollBarThemeLight
    }"
  >
    <zr-intersection
      @intersected="handleIntersection"
      :root-margin="rootMargin"
      class="scroll-wrapper"
    >
      <div class="scroll-overflow">
        <!-- @slot Slide content goes in here. -->
        <slot />
        <div class="overflow-spacer"></div>
      </div>
    </zr-intersection>
  </div>
</template>

<script>
import {ZrIntersection} from '@zaneray/vue-components';

/**
 * A component that display repeating blocks of content in a slot, in an overflowing horizontal row.
 * The overflow scrollbar and left edge of the content align with the layout-container.  There can be an
 * optional title that displays above the row of content.
 *
 * **NOTE** The spacing of this component will be off in the styleguide, since it relies on the
 * component living in a full viewport width container.
 */

export default {
  name: 'OverflowScroller',
  components: {ZrIntersection},
  props: {
    /**
     * toggles the animation of row sliding into place when user scrolls it into view
     */
    scrollAnimation: {
      type: Boolean,
      default: true
    },
    /**
     * enables / disables css scroll-snap
     */
    snap: {
      type: Boolean,
      default: true
    },
    /**
     * Enables slimmer scrollbar styling
     */
    slim: {
      type: Boolean,
      default: false
    },
    /**
     * Root Margin value to use for intersection observer, if scrollAnimation is set to true
     */
    rootMargin: {
      type: String,
      default: '0px'
    },
    /**
     * Displays the scrollbar light.
     */
    scrollBarThemeLight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      intersected: false,
      enableSnapPoints: false
    };
  },
  computed: {
    snapPoints() {
      return this.snap && this.enableSnapPoints;
    }
  },
  methods: {
    handleIntersection() {
      this.intersected = true;

      if (this.scrollAnimation && this.snap) {
        setTimeout(() => {
          this.enableSnapPoints = true;
        }, 2000);
      }
    }
  },
  created() {
    if (!this.scrollAnimation && this.snap) {
      this.enableSnapPoints = true;
    }
  }
};
</script>

<style scoped lang="scss">
$overfow-element-spacing: $spacing-200;

.scroll-overflow {
  .no-scroll-desktop & {
    overflow-x: hidden;

    @include containerLayout;

    .overflow-spacer {
      display: none;
    }

    /deep/ {
      @media (min-width: $screen-xl) {
        & > * {
          &:first-of-type {
            margin-left: 0;
          }
        }
      }

      @media (min-width: $container-breakpoint) {
        & > * {
          &:first-of-type {
            margin-left: 0;
          }
        }
      }
    }
  }

  /deep/ {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: $spacing-175;
    scroll-behavior: smooth;
    overflow-x: auto;
    overflow-y: hidden;

    & > * {
      min-width: 25%;
      margin-right: $overfow-element-spacing;

      &:first-of-type {
        margin-left: $gutter;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    @media (min-width: $screen-xl) {
      & > * {
        &:first-of-type {
          margin-left: $overflow-offset-with-gutter;
        }
      }
    }

    @media (min-width: $container-breakpoint) {
      & > * {
        &:first-of-type {
          margin-left: $overflow-offset;
        }
      }
    }
  }
}

.overflow-spacer.overflow-spacer {
  width: $gutter;
  min-width: $gutter;
  height: 100px;
  margin: 0;
  transform: translateX(0);

  @media (min-width: $screen-xl) {
    width: $overflow-offset-with-gutter;
    min-width: $overflow-offset-with-gutter;
  }

  @media (min-width: $container-breakpoint) {
    width: $overflow-offset;
    min-width: $overflow-offset;
  }
}

.scroll-wrapper {
  position: relative;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}

.snap /deep/ {
  .scroll-overflow {
    scroll-snap-type: x mandatory;
    scroll-padding: 0 0 0 $gutter;

    & > * {
      scroll-snap-align: start;
    }

    @media (min-width: $screen-xl) {
      scroll-padding: 0 0 0 $overflow-offset-with-gutter;
    }

    @media (min-width: $container-breakpoint) {
      scroll-padding: 0 0 0 $overflow-offset;
    }
  }
}

.slim {
  ::-webkit-scrollbar {
    height: $spacing-50;
  }

  &.light-scrollbar {
    ::-webkit-scrollbar-track {
      background-image: linear-gradient(
        to bottom,
        $color-white 0,
        $color-white 1px,
        transparent 1px,
        transparent $spacing-50
      );
    }
  }

  ::-webkit-scrollbar-track {
    background-image: linear-gradient(
      to bottom,
      $color-gray-1000 0,
      $color-gray-1000 1px,
      transparent 1px,
      transparent $spacing-50
    );
  }
}

@include customScrollbar;

.scroll-animation .scroll-overflow /deep/ {
  & > * {
    transform: translateX(100px);
    transition: transform 2s $easing-cubic;
  }
}

.intersected .scroll-overflow /deep/ {
  & > * {
    transform: translateX(0);
  }
}
</style>

<docs>
  ### Examples
  #### Default Scroller
  ```jsx
  <overflow-scroller>
    <base-image v-for="n in 20" :image-src="'http://placekitten.com/g/200/200'" alt-text="hello world" />
  </overflow-scroller>
  ```

  #### Scroller without snap points off
  ```jsx
  <overflow-scroller :snap="false">
    <base-image v-for="n in 20" :image-src="'http://placekitten.com/g/200/200'" alt-text="hello world" />
  </overflow-scroller>
  ```

  #### Scroller with content
  ```jsx
  <overflow-scroller title="New Climb.">
    <base-image v-for="n in 20" :image-src="'http://placekitten.com/g/200/200'" alt-text="hello world" />
  </overflow-scroller>
  <icon-definitions />
  ```

  #### Scroller with slim scrollbar
  ```jsx
  <overflow-scroller slim>
    <base-image v-for="n in 20" :image-src="'http://placekitten.com/g/200/200'" alt-text="hello world" />
  </overflow-scroller>
  ```
</docs>
