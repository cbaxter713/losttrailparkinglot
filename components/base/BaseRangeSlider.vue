<template>
  <ZrRangeSlider v-bind="$props" class="base-range-slider" @change="rangeSliderChanged" />
</template>

<script>
import {ZrRangeSlider} from '@zaneray/vue-components';

export default {
  name: 'BaseRangeSlider',
  components: {
    ZrRangeSlider
  },
  extends: ZrRangeSlider,
  methods: {
    rangeSliderChanged(event) {
      /**
       * The range slider will return a number for a single range slider and a array for dual sliders.
       *
       * @property {number || Array}
       *
       */
      this.$emit('change', event)
    }
  }
}
</script>

<style scoped lang="scss">
.base-range-slider.range /deep/ {
  $border: 2px solid $color-gray-1000;

  input[type='range'] {
    &::-webkit-slider-thumb {
      border-radius: 50% 0 0 50%;
      background-color: $color-white;
      border: $border;
    }

    &::-moz-range-thumb {
      border-radius: 50% 0 0 50%;
      background-color: red;
      border: $border;
    }

    &::-ms-thumb {
      border-radius: 50% 0 0 50%;
      background-color: $color-white;
      border: $border;
    }

    &:last-of-type::-webkit-slider-thumb {
      border-radius: 0 50% 50% 0;
    }

    &:last-of-type::-moz-range-thumb {
      border-radius: 0 50% 50% 0;
    }

    &:last-of-type::-ms-thumb {
      border-radius: 0 50% 50% 0;
    }
  }

  .range-track {
    background: $color-gray-400;
  }

  .range-display {
    background: $color-gray-1000;
  }
}
</style>

<docs>
    ### Examples

    #### Default Range Slider
    ```jsx
    <BaseRangeSlider/>
    ```

    #### Slider Dual preset values
    ```jsx
    <BaseRangeSlider :min-value="10" :max-value="70" />
    ```

    #### Slider Dual preset values
    ```jsx
    <BaseRangeSlider :min-value="600" :max-value="12000" :range-slide-min="500" :range-slide-max="18000"/>
    ```

    #### Slider preset values
    ```jsx
    <BaseRangeSlider :min-value="60" :max-value="300" :range-slide-min="0" :range-slide-max="350"/>
    ```

</docs>
