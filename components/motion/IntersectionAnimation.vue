<template>
  <zr-intersection
    @intersected="triggerAnimation"
    :root-margin="rootMargin"
    :once="once"
    class="intersection-container"
    :class="{intersected: intersected}"
  >
    <component :is="transitionType" :name="name" :tag="tag" appear>
      <!-- @slot Intersection animation is applied to the element that gets put in the slot. Recommended single child only -->
      <slot v-if="intersected"></slot>
    </component>
  </zr-intersection>
</template>

<script>
import {ZrIntersection} from '@zaneray/vue-components';

/**
 * Component for applying a translate up animation to any element, when the element is intersected in the viewport
 */

export default {
  name: 'IntersectionAnimation',
  components: {ZrIntersection},
  data() {
    return {
      intersected: false
    };
  },
  props: {
    /**
     *
     */
    name: {
      type: String,
      default: 'slide-up',
      validator: (value) => {
        return ['slide-up', 'stagger-up', 'slide-right'].includes(value);
      }
    },
    /**
     * Tag to render if transition group is used for list transition
     */
    tag: {
      type: String,
      default: 'span'
    },
    /**
     * Root Margin value to apply to the intersection observer.
     */
    rootMargin: {
      type: String,
      default: '100px'
    },
    /**
     * Defines if the intersection event should only fire 1 time
     */
    once: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    transitionType() {
      const multiple = ['stagger-up'].includes(this.name);
      return multiple ? 'transition-group' : 'transition';
    }
  },
  methods: {
    triggerAnimation() {
      this.intersected = true;
    }
  }
};
</script>

<style scoped lang="scss">
.intersection-container {
  height: 100%;
}
</style>

<docs>
  ### Examples

  ```jsx
  <intersection-animation>
    <img src="/static/fpo/gallery-lg.jpg" />
  </intersection-animation>
  ```
</docs>
