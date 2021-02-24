<template>
  <zr-intersection
    :root-margin="rootMargin"
    :once="false"
    @intersected="intersected($event)"
    class="load-more-container"
  >
    <base-button class="load-more-button" v-bind="$props" @click.native="loadMore">
      <slot />
    </base-button>
  </zr-intersection>
</template>

<script>
import {ZrIntersection} from '@zaneray/vue-components';
import BaseButton from '../base/BaseButton';

export default {
  name: 'LoadMore',
  components: {BaseButton, ZrIntersection},
  extends: BaseButton,
  props: {
    rootMargin: {
      type: String,
      default: '500px'
    }
  },
  methods: {
    intersected($event) {
      this.$emit('intersected', $event);
    },
    loadMore() {
      this.$emit('loadMore');
    }
  }
};
</script>

<style scoped lang="scss">
.load-more-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-200;

  @media (min-width: $navigation-breakpoint) {
    padding: $spacing-400;
  }

  /deep/ .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
