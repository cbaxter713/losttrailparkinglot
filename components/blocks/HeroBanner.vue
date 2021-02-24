<template>
  <section class="hero-banner" :class="`banner-${size}`">
    <simple-banner v-bind="$props" :title="null">
      <slot name="aboveTout" />
      <base-tout
        :theme="theme === 'dark' ? 'negative' : 'positive'"
        :alignment="horizontalAlignment"
        :subhead="subhead"
        :title="title"
        titleClass="display-1"
        :copy="copy"
        :links="links"
      />
      <slot name="belowTout" />
    </simple-banner>
  </section>
</template>

<script>
import SimpleBanner from '../patterns/SimpleBanner';
import BaseTout from '../base/BaseTout';

export default {
  name: 'HeroBanner',
  components: {
    BaseTout,
    SimpleBanner
  },
  extends: SimpleBanner,
  props: {
    subhead: {
      type: String,
      default: ''
    },
    copy: {
      type: String,
      default: ''
    },
    links: {
      type: Array,
      default: () => {
        return [];
      }
    },
    size: {
      type: String,
      default: 'full',
      validator: (value) => {
        return ['full', 'normal'].includes(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.hero-banner {
  position: relative;

  /deep/ {
    .banner-content {
      padding: 4.44vw 0;

      @media (min-width: $screen-sm) {
        padding: 6.66vw 0;
      }
    }

    .banner-content-inner {
      @media (min-width: $navigation-breakpoint) {
        padding: 0 $spacing-350;
      }
    }
  }
}

.banner-full /deep/ {
  .simple-banner-inner {
    padding: 0;
    height: 100vh;
  }

  .banner-picture-container {
    padding: 0;
    height: 100vh;
  }

  @media (max-width: $screen-xs-max) {
    .banner-content {
      padding-bottom: $mobile-bottom-spacing;
    }
  }
}
</style>

<docs>
  ### Examples

  #### Default ImageBanner
  ```jsx
  <hero-banner :mobile-img="images.banner_image.mobile.url"
                :desktop-img="images.banner_image.url"
                :alt-text="'Text about image'"
                theme="dark"
                title-html="<h1>Test Title</h1>"
                copy-html="Subtitle Displays Here"
  >
  </hero-banner>
  ```

  #### Right and middle aligned
  ```jsx
  <hero-banner :mobile-img="images.banner_image.mobile.url"
                :desktop-img="images.banner_image.url"
                :alt-text="'Text about image'"
                theme="dark"
                title-html="<h1>Test Title</h1>"
                copy-html="Subtitle Displays Here"
                horizontal-position="right"
                vertical-position="middle"
  >
  </hero-banner>
  ```
</docs>
