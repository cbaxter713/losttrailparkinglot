<template>
  <zr-image :image-src="imageSrc" root-margin="800px" :alt-text="altText"></zr-image>
</template>

<script>
import {ZrImage} from '@zaneray/vue-components';

/**
 * Image component that leverages the Zaneray ZrImage documented at https://zr-vue.netlify.com/#/Bfase%20Components/ZrImage
 */

export default {
  name: 'BaseImage',
  components: {
    ZrImage
  },
  extends: ZrImage
};
</script>

<style scoped lang="scss">
/deep/ img {
  display: block;
}
</style>

<docs>
  ###Examples

  #### Basic Image
  ```jsx
  <base-image :image-src="images.thumbnail.url" :alt-text="images.thumbnail.alt"></base-image>
  ```
</docs>
