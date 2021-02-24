<template>
  <zr-picture v-bind="$props" root-margin="800px"></zr-picture>
</template>

<script>
import {ZrPicture} from '@zaneray/vue-components';

export default {
  name: 'BasePicture',
  components: {
    ZrPicture
  },
  extends: ZrPicture
};
</script>

<style scoped lang="scss">
picture {
  width: 100%;
}

img {
  display: block;
}
</style>

-<docs>
  ### Picture (lazy loading is set to true by default)
  ```jsx
  <BasePicture :altText="images.banner_image_light.alt"
               :desktopImg="images.banner_image_light.url"
               :mobileImg="images.banner_image_light.mobile.url">
  </BasePicture>
  ```

  ### Picture with lazy loading
  ```jsx
  <BasePicture :altText="images.banner_image.alt"
               :desktopImg="images.banner_image.url"
               :mobileImg="images.banner_image.mobile.url"
               lazy="true">
  </BasePicture>
  ```

  ### Picture without lazy loading

  ```jsx
  <BasePicture :altText="images.banner_image.alt"
               :desktopImg="images.banner_image.url"
               :mobileImg="images.banner_image.mobile.url"
               lazy="false">
  </BasePicture>
  ```
  </docs>
