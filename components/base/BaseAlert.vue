<template>
  <zr-alert v-bind="$props"></zr-alert>
</template>

<script>
import {ZrAlert} from '@zaneray/vue-components';

/**
 * Alert component that leverages the Zaneray BaseAlert documented at https://zr-vue.netlify.com/#/Base%20Components/ZrAlert
 */

export default {
  name: 'BaseAlert',
  components: {ZrAlert},
  extends: ZrAlert
};
</script>

<docs>
  ```jsx
  <BaseAlert message="Alert primary is default and requires no type attribute."></BaseAlert>
  ```
  ```jsx
  <BaseAlert message="This is a primary alert" type="primary"></BaseAlert>
  ```

  ```jsx
  <BaseAlert message="This is a secondary alert" type="secondary"></BaseAlert>
  ```

  ```jsx
  <BaseAlert message="This is a success alert" type="success"></BaseAlert>
  ```

  ```jsx
  <BaseAlert message="This is a danger alert" type="danger"></BaseAlert>
  ```

  ```jsx
  <BaseAlert message="This is a warning alert" type="warning"></BaseAlert>
  ```
</docs>
