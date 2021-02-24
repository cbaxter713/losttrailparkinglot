<template>
  <div
    class="simple-banner"
    :class="{'short-banner': short, active: heroActive, parallax: parallax}"
    ref="banner"
  >
    <theme class="simple-banner-inner" :theme="theme">
      <div class="banner-picture-container">
        <div class="parallax-layer" ref="parallaxLayer">
          <base-picture
            v-if="desktopImg && mobileImg"
            class="banner-picture"
            :desktop-img="desktopImg"
            :tablet-img="tabletImg"
            :mobile-img="mobileImg"
            :altText="altText"
            :breakpoint-desktop="768"
            :breakpoint-tablet="540"
          ></base-picture>
        </div>
      </div>
      <div
        class="banner-content"
        :class="`align-${horizontalAlignment} align-${verticalAlignment}`"
      >
        <layout-container class="content-container">
          <div class="banner-content-inner">
            <div v-if="title" class="title" v-html="title"></div>
            <slot />
          </div>
        </layout-container>
      </div>
    </theme>
  </div>
</template>

<script>
import BasePicture from '../base/BasePicture';
import LayoutContainer from '../layout/LayoutContainer';
import Theme from './Theme';
import {themeProps} from '../../mixins/sharedProps';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger.js';

/**
 * A banner component that displays a title and optional
 * subtitle over a large banner image.  It has flexible height
 * at mobile sizes, defined by the height of content within it.  At
 * tablet and desktop sizes it displays at a set aspect ratio.
 * It is meant to display at full viewport width, so banner size
 * in the styleguide will be slightly off
 */

export default {
  name: 'SimpleBanner',
  mixins: [themeProps],
  components: {Theme, LayoutContainer, BasePicture},
  props: {
    /**
     * HTML string of title text to displays as H1 by default
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Image URL to display as the image at desktop screen sizes
     */
    desktopImg: {
      type: String,
      default: '',
    },
    /**
     * Image URL to display as the image at tablet screen sizes
     */
    tabletImg: {
      type: String,
      default: '',
    },
    /**
     * Image URL to display as the image at mobile screen sizes.
     */
    mobileImg: {
      type: String,
      default: '',
    },
    /**
     * Alternative text for the image
     */
    altText: {
      type: String,
      default: '',
    },
    short: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
      validator: function (value) {
        return ['light', 'dark'].includes(value);
      },
    },
    horizontalAlignment: {
      type: String,
      default: 'center',
      validator: (value) => {
        return ['left', 'center', 'right'].includes(value);
      },
    },
    verticalAlignment: {
      type: String,
      default: 'middle',
      validator: (value) => {
        return ['top', 'middle', 'bottom'].includes(value);
      },
    },
    parallax: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      heroActive: false,
      introTimeline: null,
    };
  },
  mounted() {
    // Animate in the hero content
    setTimeout(() => {
      this.heroActive = true;
    }, 400);

    // Init parallax scroll trigger
    if (this.parallax) {
      gsap.registerPlugin(ScrollTrigger);

      this.introTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.banner,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.1,
          //markers: true
        },
      });

      this.introTimeline.to(this.$refs.parallaxLayer, {
        yPercent: -10,
      });
    }
  },
  updated() {
    if (this.parallax) {
      ScrollTrigger.refresh(true);
    }
  },
  beforeDestroy() {
    if (this.parallax) {
      this.introTimeline.kill();
    }
  },
};
</script>

<style scoped lang="scss">
$simple-banner-tablet-breakpont: $screen-xs;
$simple-banner-breakpoint: $screen-sm;
$simple-banner-ratio-mobile: calc(100vh - 200px);
$simple-banner-ratio-desktop: 50%;
$simple-banner-max-height: calc(100vh - 300px);
$short-banner-ratio-mobile: 70%;
$short-banner-ratio-tablet: 60%;
$short-banner-ratio-desktop: 33.3333%;

.simple-banner-inner {
  position: relative;
  display: flex;
  align-items: center;
  height: $simple-banner-ratio-mobile;
  overflow: hidden;

  /deep/ .theme-contents {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @media (min-width: $simple-banner-breakpoint) {
    height: 0;
    padding-bottom: $simple-banner-ratio-desktop;
  }

  @media (min-width: $screen-xl) {
    height: $simple-banner-max-height;
    padding: 0;
  }

  .short-banner & {
    padding-bottom: $short-banner-ratio-mobile;

    @media (min-width: $simple-banner-tablet-breakpont) {
      padding-bottom: $short-banner-ratio-tablet;
    }

    @media (min-width: $simple-banner-breakpoint) {
      padding-bottom: $short-banner-ratio-desktop;
    }

    @media (min-width: $screen-xl) {
      height: 0;
      padding-bottom: $short-banner-ratio-desktop;
    }
  }
}

.banner-picture-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: $image-opacity;

  /deep/ img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .parallax & {
    position: fixed;
    height: $simple-banner-ratio-mobile;

    @media (min-width: $simple-banner-breakpoint) {
      height: 0;
      padding-bottom: $simple-banner-ratio-desktop;
    }

    @media (min-width: $screen-xl) {
      height: $simple-banner-max-height;
      padding: 0;
    }
  }

  .parallax.short-banner & {
    padding-bottom: $short-banner-ratio-mobile;

    @media (min-width: $simple-banner-tablet-breakpont) {
      padding-bottom: $short-banner-ratio-tablet;
    }

    @media (min-width: $simple-banner-breakpoint) {
      padding-bottom: $short-banner-ratio-desktop;
    }

    @media (min-width: $screen-xl) {
      height: 0;
      padding-bottom: $short-banner-ratio-desktop;
    }
  }
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  will-change: transform;
}

.banner-picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-content {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  width: 100%;
  padding: $spacing-400 0;

  &.align-top {
    align-items: flex-start;
  }

  &.align-bottom {
    align-items: flex-end;
  }

  @media (min-width: $simple-banner-breakpoint) {
    padding: 5.5rem 0;
  }
}

.banner-content-inner {
  opacity: 0;
  transform: translateY(5vh);
  transition: all 1.5s $hero-content-ease;
  text-align: center;
  margin: 0 auto;

  .active & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: $screen-sm) {
    text-align: left;
    max-width: 60%;
    margin: 0;

    .align-center & {
      text-align: center;
      max-width: 75%;
      margin: 0 auto;
    }

    .align-right & {
      margin: 0 0 0 auto;
      text-align: right;
    }
  }
}

.title /deep/ {
  & > * {
    margin: 0;
    font-size: 2.75rem;
    word-break: break-word;

    @media (min-width: $simple-banner-breakpoint) {
      font-size: 5.5vw;
    }

    @media (min-width: $screen-xl) {
      font-size: $font-size-900;
    }
  }
}
</style>

<docs>
### Examples

#### Default display
```jsx
<simple-banner
  title="<h1>Banner Title</h1>"
  :desktop-img="images.banner_image.url"
  :tablet-img="images.banner_image.half.url"
  :mobile-img="images.banner_image.mobile.url"
  alt-text="Description of the image"
></simple-banner>
```

#### Align bottom
```jsx
<simple-banner
  title="<h1>Banner Title</h1>"
  vertical-alignment="bottom"
  :desktop-img="images.banner_image.url"
  :tablet-img="images.banner_image.half.url"
  :mobile-img="images.banner_image.mobile.url"
  alt-text="Description of the image"
></simple-banner>
```

#### Align left and bottom
```jsx
<simple-banner
  title="<h1>Banner Title</h1>"
  vertical-alignment="bottom"
  horizontal-alignment="left"
  :desktop-img="images.banner_image.url"
  :tablet-img="images.banner_image.half.url"
  :mobile-img="images.banner_image.mobile.url"
  alt-text="Description of the image"
></simple-banner>
```

#### With slot content
```jsx
<simple-banner
  title="<h1>Banner Title</h1>"
  :desktop-img="images.banner_image.url"
  :tablet-img="images.banner_image.half.url"
  :mobile-img="images.banner_image.mobile.url"
  alt-text="Description of the image"
>
  <h3>Subhead in the slot</h3>
</simple-banner>
```
</docs>
