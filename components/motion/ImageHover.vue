<template>
  <div class="image-wrapper" :class="{hovered: hovered, 'darken-image': darkenImage}">
    <base-picture
      v-if="mobileImg && desktopImg"
      v-bind="$props"
      :alt-text="altText"
      class="image-container"
    />
    <base-image v-else :image-src="mobileImg" :alt-text="altText" class="image-container" />
  </div>
</template>

<script>
import BaseImage from '../base/BaseImage';
import BasePicture from '../base/BasePicture';

/**
 * A reusable hover animation for base images.  The image wrapper is positioned absolute to fill
 * its parent containers space, and the image is set to fill that same space, displayed with object-fit: cover.
 * When the hover state is set to true the image wrapper sets a scaling transition effect on the image
 */

export default {
  name: 'ImageHover',
  components: {BasePicture, BaseImage},
  extends: BasePicture,
  props: {
    /**
     * Whether or not the component is currently hovered
     */
    hovered: {
      type: Boolean,
      default: false
    },
    darkenImage: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.darken-image {
    background-color: $background-dark-color;
  }
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: $transition-image-hover;

  .hovered & {
    transform: scale(1.06);
  }

  .darken-image & {
    opacity: $image-opacity;
  }
}

/deep/ img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<docs>
  ### Examples

  #### Dynamic example
  ##### Hovering the outer container will trigger the hover state of the image-hover component
  ```jsx
  const hovered = false;
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    style="width: 100%; height: 0; padding-bottom: 56.25%; position: relative;"
  >
    <image-hover :image-src="images.thumbnail.url" :hovered="hovered" />
  </div>
  ```

  #### Non-hovered (default) state

</docs>
