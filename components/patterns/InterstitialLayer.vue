<template>
  <trap>
    <overlay-layer :active="active" @close="$emit('close')" class="layer-overlay"></overlay-layer>
    <transition name="slide">
      <div class="info-layer" v-if="active">
        <base-close class="close-button" @click.native="closeLayer" />
        <slot></slot>
      </div>
    </transition>
  </trap>
</template>

<script>
import Trap from 'vue-focus-lock';
import OverlayLayer from './OverlayLayer';
import BaseClose from '../base/BaseClose';

export default {
  name: 'InterstitialLayer',
  components: {BaseClose, OverlayLayer, Trap},
  model: {
    prop: 'active',
    event: 'close'
  },
  props: {
    /**
     * Whether or not to show the layer. Defaults to false. Intended to be used to toggle the layer on and off
     */
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeLayer() {
      this.$emit('close');
    },
    escapeHandler() {
      if (event.keyCode === 27) {
        this.closeLayer();
      }
    }
  },
  watch: {
    showLayer: {
      immediate: true,
      handler: function(value) {
        this.$store.dispatch('setBodyScrollLock', value);
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.escapeHandler);
  },
  destroyed() {
    window.removeEventListener('keyup', this.escapeHandler);
  }
};
</script>

<style lang="scss" scoped>
.layer-overlay {
  z-index: $z-index-level-modal;
}

.info-layer {
  background-color: $color-white;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: $z-index-level-modal + 1;

  @media (min-width: $screen-sm) {
    transition: transform 0.5s ease-out 0s;
    width: 582px;
    left: auto;
  }
}

.slide-enter,
.slide-leave-to {
  transform: translateX(calc(100% + #{$spacing-300}));
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: $gutter;
}
</style>

<docs>
  ### Examples

  ```jsx
  const show = false;

  <div style="height: 100vh;">
    <base-button @click.native="show = true">Show Layer</base-button>
    <interstitial-layer v-model="show">
      <div>
        <h2>Sizing Guide</h2>
        <base-image alt-text="Alt Text" image-src="/static/fpo/yeti-gallery-tall.png"></base-image>
      </div>
    </interstitial-layer>
    <icon-definitions></icon-definitions>
  </div>
  ```
</docs>
