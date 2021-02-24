<template>
  <zr-loading v-bind="$props"></zr-loading>
</template>

<script>
import {ZrLoading} from '@zaneray/vue-components';

/**
 * Loading component that leverages the Zaneray BaseLoading documented at https://zr-vue.netlify.com/#/Base%20Components/ZrLoading
 */

export default {
  name: 'BaseLoading',
  components: {ZrLoading},
  extends: ZrLoading
};
</script>

<style scoped lang="scss">
/deep/ {
  .default-spinner {
    box-sizing: content-box;
    border-top: 4px solid $color-primary;
  }
}
</style>

<docs>
  ```jsx
  <div style="position: relative; height: 250px; width: 650px;">
    <BaseLoading :active="true" :background="true"></BaseLoading>
  </div>
  ```
</docs>
