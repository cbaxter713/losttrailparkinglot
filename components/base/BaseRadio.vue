<template>
  <zr-radio v-bind="$props" class="base-radio"></zr-radio>
</template>

<script>
import {ZrRadio} from '@zaneray/vue-components';

export default {
  name: 'BaseRadio',
  components: {
    ZrRadio
  },
  extends: ZrRadio
};
</script>

<style scoped lang="scss">
.base-radio.base-radio /deep/ {
  @include formInputToggle;

  label {
    &::before {
      transition: all 0.2s ease-out;
    }
  }

  input {
    &:checked + label {
      &::before {
        border-color: $color-primary;
        border-width: 10px;
      }
    }
  }

  label::after {
    display: none;
  }
}
</style>

<docs>
  ### Examples

  #### Default Radio
  ```jsx
  <base-radio label="Radio Label" value="1" id="radio1" name="radioGroup1"></base-radio>
  ```

  #### Selected Radio
  ```jsx
  <base-radio label="Label Here" value="2" id="radio2" name="radioGroup2" selected></base-radio>
  ```

  #### Multiple Radios - note: these will change once the ZrRadioGroup item makes it into the UI pantry
  ```jsx
  <div>
    <base-radio label="Radio 1" value="1" id="radio3" name="multiple"></base-radio>
    <base-radio label="Radio 2" value="2" id="radio4" name="multiple"></base-radio>
    <base-radio label="Radio 3" value="3" id="radio5" name="multiple"></base-radio>
    <base-radio label="Radio 4" value="4" id="radio6" name="multiple"></base-radio>
  </div>
  ```
</docs>
