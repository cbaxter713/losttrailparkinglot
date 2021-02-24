<template>
  <transition :name="transition">
    <div v-show="active" class="overlay" @click="close"></div>
  </transition>
</template>

<script>
/**
 * Displays a full screen overlay layer, which a default fade transition and dark transparent background.
 * There is intentionally no z-index set on this component, so you can use whatever z-index you want where you use it.
 * This is meant to be used anytime we need a full page layer darkening
 */

export default {
  name: 'OverlayLayer',
  props: {
    /**
     * Whether or not to display the overlay layer
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * The transition name to use.  Depends on CSS existing globally to drive that Vue transition
     */
    transition: {
      type: String,
      default: 'overlay'
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $overlay-background-color;
  cursor: pointer;
}
</style>

<docs>
  #### Default OverlayLayer
  ```jsx
  const layerActive = false;

  <button @click="layerActive = true">Show Layer</button>
  <overlay-layer :active="layerActive" @close="layerActive = false"></overlay-layer>
  ```
</docs>
