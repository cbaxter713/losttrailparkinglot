<template>
  <component
    :is="componentType"
    class="base-cta-link"
    :class="[
      `cta-${size}`,
      {
        'hover-link': hoverLink,
        hovered: hovered,
        reversed: reversed
      }
    ]"
    v-bind="$props"
    :aria-label="ctaAriaLabel"
  >
    <!-- @slot Put the CTA Link text here -->
    <span class="cta-label">
      <slot></slot>
    </span>
    <span class="cta-icon">
      <base-icon :icon="icon" class="cta-arrow" :aria-hidden="true" />
    </span>
  </component>
</template>

<script>
import BaseLink from './BaseLink';
import BaseIcon from './BaseIcon';

export default {
  name: 'BaseCtaLink',
  extends: BaseLink,
  components: {BaseIcon, BaseLink},
  computed: {
    componentType() {
      if (this.url || this.cmsLink.url) {
        return 'base-link';
      } else if (this.button) {
        return 'button';
      }

      return 'div';
    }
  },
  props: {
    /**
     * Should the chevron move animation show on hover
     */
    hoverLink: {
      type: Boolean,
      default: true
    },
    /**
     * If triggering the hover state from a parent. Set to true to trigger the hover state
     */
    hovered: {
      type: Boolean,
      default: false
    },
    /**
     * Should render the component as a button
     */
    button: {
      type: Boolean,
      default: false
    },
    /**
     * Font size, which affects underline size, and spacing as well
     * Options:
     * 75 - Font size 14px,
     * 100 - Font size 16px
     * 200 - Font size 18px
     * 300 - Font size 24px
     * 400 - Font size 32px
     */
    size: {
      type: String,
      default: '100',
      validator: function(value) {
        return ['50', '75', '100', '200', '300', '400'].includes(value);
      }
    },
    icon: {
      type: String,
      default: 'arrow-right'
    },
    reversed: {
      type: Boolean,
      default: false
    },
    ctaAriaLabel: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
$arrow-spacing: $spacing-100;

.base-cta-link {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  font-family: $font-family-headings;
  font-size: $font-size-75;
  line-height: 1;
  color: $base-type-color;
  text-decoration: none;
  text-transform: none;
  cursor: pointer;

  &.cta-50 {
    font-size: $font-size-75;
  }

  &.cta-75 {
    font-size: $font-size-100;
  }

  &.cta-100 {
    font-size: $font-size-125;
  }

  &.cta-200 {
    font-size: $font-size-150;
  }

  &.cta-300 {
    font-size: $font-size-200;
  }

  &.cta-400 {
    font-size: $font-size-250;

    @media (min-width: $screen-lg-min) {
      font-size: $font-size-300;
    }
  }

  &.reversed {
    flex-flow: row-reverse;
  }

  .theme-dark & {
    color: $color-white;
  }
}

.cta-icon {
  position: relative;
  width: 1em;
  height: 1em;
  font-size: $spacing-250;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: $arrow-spacing;
  background-color: $oboz-green-accessible;
  border-radius: 50%;
  box-shadow: 0 2px 1rem 0 rgba($color-black, 0.25);

  .reversed & {
    margin: 0 $spacing-75 0 0;
  }

  /deep/ svg {
  }
}

.cta-arrow {
  width: 0.6em;
  height: 0.6em;
  fill: $color-white;
  color: $color-white;

  .reversed & {
    transform: rotate(180deg);
  }
}

.hover-link {
  .cta-icon {
    transition: transform 0.3s ease-out;
  }

  &:hover,
  &.hovered {
    .cta-icon {
      transform: translateX($spacing-25);
    }
  }

  &.reversed {
    &:hover {
      .cta-icon {
        transform: translateX(-$spacing-25);
      }
    }
  }
}
</style>

<docs>
  ### Examples

  #### Size 75
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" size="75">Explore</base-cta-link>
  <icon-definitions />
  ```

  #### Size 100
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" size="100">Explore</base-cta-link>
  <icon-definitions />
  ```

  #### Size 200
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" size="200">Explore</base-cta-link>
  <icon-definitions />
  ```

  #### Size 300
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" size="300">Explore</base-cta-link>
  <icon-definitions />
  ```

  #### CTA Link Reversed
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" reversed>Explore</base-cta-link>
  <icon-definitions />
  ```

  ### CTA Link without hover
  ```jsx
  <base-cta-link url="/Base%20Components/BaseLink" :hover-link="false">Explore</base-cta-link>
  <icon-definitions />
  ```

  ### CTA Link with hover triggered programmatically from a parent
  ```jsx
  let hovered = true;

  <base-cta-link url="/Base%20Components/BaseLink" :hover-link="false" :hovered="hovered">Explore</base-cta-link>
  <icon-definitions />
  ```

  ### CTA Link with hover with dark theme
  ```jsx
  <theme theme="dark">
    <div style="padding: 20px;">
      <base-cta-link url="/Base%20Components/BaseLink">Explore</base-cta-link>
    </div>
  </theme>
  <icon-definitions />
  ```
</docs>
