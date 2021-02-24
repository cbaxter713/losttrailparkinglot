<template>
  <client-only>
    <zr-checkbox
      v-bind="$props"
      class="base-checkbox"
      @change="updateValue"
      @changeEvent="updateEvent"
    ></zr-checkbox>
  </client-only>
</template>

<script>
import {ZrCheckbox} from '@zaneray/vue-components';

/**
 * This base checkbox component leverages the ZaneRay UI Pantry checkbox document at https://zr-vue.netlify.com/#/ZrCheckbox
 */

export default {
  name: 'BaseCheckbox',
  components: {
    ZrCheckbox
  },
  extends: ZrCheckbox,
  methods: {
    updateValue(value) {
      this.$emit('change', value);
    },
    updateEvent(event) {
      this.$emit('changeEvent', event);
    }
  }
};
</script>

<style scoped lang="scss">
.base-checkbox.base-checkbox /deep/ {
  @include formInputToggle;

  label {
    &::after {
      content: '';
      top: -2px;
      left: -2px;
      width: $input-toggle-height;
      height: $input-toggle-height;
      border: none;
      background-image: url('data:image/svg+xml;base64,ICA8c3ZnIGlkPSJpY29uLWNsb3NlIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8cG9seWdvbgogICAgICBmaWxsPSIjZmZmZmZmIgogICAgICBwb2ludHM9IjE5LjA3IDYuMzQgMTcuNjYgNC45MyAxMiAxMC41OSA2LjM0IDQuOTMgNC45MyA2LjM0IDEwLjU5IDEyIDQuOTMgMTcuNjYgNi4zNCAxOS4wNyAxMiAxMy40MSAxNy42NiAxOS4wNyAxOS4wNyAxNy42NiAxMy40MSAxMiAxOS4wNyA2LjM0IgogICAgLz4KICA8L3N2Zz4=');
      background-repeat: no-repeat;
      background-position: 2px 2px;
      color: $color-white;
      background-color: transparent;
      transform: rotate(0) scale(0.25);
      transition: all 0.2s ease-out;
    }
  }

  input {
    &:checked + label {
      &::before {
        border-color: $color-primary;
        background-color: $color-primary;
        transition: all 0.2s ease-out;
      }
    }

    &:checked + label {
      &::after {
        transform: rotate(0) scale(1);
      }
    }
  }
}
</style>

<docs>
  ### Examples

  #### Default Checkbox
  ```jsx
  <BaseCheckbox label="Checkbox Label" value="1" id="check1"></BaseCheckbox>
  ```

  #### Selected Checkbox
  ```jsx
  <BaseCheckbox label="Label Here" value="2" id="check2" selected></BaseCheckbox>
  ```
</docs>
