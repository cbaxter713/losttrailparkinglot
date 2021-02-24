<template>
  <zr-button
    class="base-button"
    :class="{'has-icon': icon}"
    v-bind="$props"
    :link-path="finalLinkPath"
    nuxt
  >
    <slot></slot>
    <base-icon
      v-if="icon"
      class="btn-icon"
      :class="{'animate-icon': animateIcon}"
      :icon="icon"
    ></base-icon>
  </zr-button>
</template>

<script>
import {ZrButton} from '@zaneray/vue-components';
import BaseIcon from './BaseIcon';

/**
 * Button component that leverages the Zaneray BaseButton documented at https://zr-vue.netlify.com/#/Base%20Components/ZrButton
 */

export default {
  name: 'BaseButton',
  components: {
    BaseIcon,
    ZrButton,
  },
  extends: ZrButton,
  props: {
    /**
     * Icon to display in the button.
     */
    icon: {
      type: String,
    },
    animateIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // Only return localePath version if using localized content from nuxt-i18n module
    finalLinkPath() {
      return this.linkPath && !this.externalLink ? this.localePath(this.linkPath) : this.linkPath;
    },
  },
};
</script>

<style scoped lang="scss">
$button-icon-size: $spacing-150;
$button-icon-spacing: $spacing-100;
$button-hover-layer-z-index: 0;
$button-content-z-index: $button-hover-layer-z-index + 1;

.btn.base-button {
  position: relative;
  min-width: 0;
  padding: 1rem 2.75rem;
  font-family: $font-family-headings;
  font-size: $font-size-125;
  color: $color-white;
  border: none;
  border-radius: $input-border-radius;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    opacity: 0;
    transition: all $transition-base;
    z-index: $button-hover-layer-z-index;
  }

  /deep/ {
    .label {
      position: relative;
      line-height: 1.2;
    }
  }

  &.has-icon {
    padding-right: calc(2.75rem - #{$button-icon-size/2});
  }

  &.has-icon /deep/ {
    .label {
      padding-right: calc(#{$button-icon-size} + #{$button-icon-spacing});
    }
  }

  .btn-icon /deep/ {
    position: absolute;
    top: -2px;
    right: 0;
    width: $spacing-150;
    height: $spacing-150;
    fill: $color-primary;
    transform: translateX(0);
    transition: transform $transition-base;
  }

  &:hover {
    .btn-icon.animate-icon {
      transform: translateX(5px);
    }

    &::before {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &.btn-default {
    background-color: $color-gray-900;

    &::before {
      background-color: $color-gray-800;
    }
  }

  &.btn-primary,
  &.btn-action {
    background-color: $color-primary;

    &::before {
      background-color: darken($color-primary, 3%);
    }

    .btn-icon /deep/ {
      fill: $color-white;
    }
  }
}
</style>

<docs>
  ### Examples

  #### Button Variations
  ```jsx
  <div>
    <BaseButton style="margin-bottom: 10px">Default</BaseButton>
    <BaseButton theme="primary" style="margin-bottom: 10px">Primary</BaseButton>
  </div>
  ```

  #### Button with Icon
  ```jsx
  <div>
    <BaseButton style="margin-bottom: 10px" icon="arrow-right">Next</BaseButton>
    <BaseButton theme="primary" style="margin-bottom: 10px" icon="arrow-right">Next</BaseButton>
    <icon-definitions></icon-definitions>
  </div>
  ```

  #### Animate Icon on Hover
  ```jsx
  <div>
    <BaseButton style="margin-bottom: 10px" icon="arrow-right" animate-icon>Next</BaseButton>
    <icon-definitions></icon-definitions>
  </div>
  ```

  #### Button States
  ```jsx
  <div>
    <BaseButton style="margin-bottom: 10px" loading>Loading</BaseButton>
    <BaseButton style="margin-bottom: 10px" theme="primary" loading>Loading</BaseButton>
    <BaseButton style="margin-bottom: 10px" disabled>Disabled</BaseButton>
    <BaseButton style="margin-bottom: 10px" theme="primary" disabled>Disabled</BaseButton>
    <BaseButton style="margin-bottom: 10px" theme="primary" full>Full Width</BaseButton>
    <icon-definitions></icon-definitions>
  </div>
  ```
</docs>
