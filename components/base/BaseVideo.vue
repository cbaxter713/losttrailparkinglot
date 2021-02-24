<template>
  <zr-video v-bind="$props"></zr-video>
</template>

<script>
import {ZrVideo} from '@zaneray/vue-components';

export default {
  name: 'BaseVideo',
  components: {ZrVideo},
  extends: ZrVideo
};
</script>

<style scoped lang="scss"></style>

<docs>
  ### Examples

  #### Default video with lazy loading
  ```jsx
  <base-video
    :video-url="video"
  >
  </base-video>
  ```

  #### Video with custom lazy loading
  ```jsx
  <base-video
    :video-url="video"
    fade-duration="5"
    fade-easing="linear"
  >
  </base-video>
  ```

  #### Video with no lazy loading
  ```jsx
  <base-video
    :video-url="video"
    :lazy="false"
  >
  </base-video>
  ```
</docs>
