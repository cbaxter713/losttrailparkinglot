<template>
  <stacked-component class="split-callout" spacing>
    <layout-container class="split-callout-container">
      <theme class="mobile-background" :theme="theme" :topo="topo" />
      <div
        class="split-callout-inner"
        :class="[`image-align-${imageAlignment}`, {'desktop-image-bleed': desktopImageBleed}]"
      >
        <div class="split-callout-image-container">
          <base-image
            :image-src="desktopImg.url"
            :alt-text="altText"
            :style="{'padding-bottom': `${(desktopImg.y / desktopImg.x) * 100}%`}"
            class="split-callout-image desktop-image"
          />
          <base-image
            :image-src="mobileImg.url"
            :alt-text="altText"
            :style="{'padding-bottom': `${(mobileImg.y / mobileImg.x) * 100}%`}"
            class="split-callout-image mobile-image"
          />
        </div>
        <div class="split-callout-content-container">
          <div class="split-callout-content-inner">
            <theme class="desktop-background" :theme="theme" :topo="topo" />
            <base-tout
              :theme="toutTheme"
              :subhead="subhead"
              :title="title"
              :titleClass="titleClass"
              :copy="copy"
              :links="toutLink"
              heading-type="h2"
              class="split-callout-content"
            />
          </div>
        </div>
      </div>
    </layout-container>
  </stacked-component>
</template>

<script>
import StackedComponent from '../layout/StackedComponent';
import {themeProps} from '../../mixins/sharedProps';
import Theme from '../patterns/Theme';
import LayoutContainer from '../layout/LayoutContainer';
import BaseTout from '../base/BaseTout';
import BaseImage from '../base/BaseImage';

/**
 * Component that displays an image next to a title, content and CTA
 */

export default {
  components: {
    BaseImage,
    BaseTout,
    LayoutContainer,
    Theme,
    StackedComponent,
  },
  name: 'SplitCallout',
  mixins: [themeProps],
  props: {
    /**
     * Which side to display the image on (left or right)
     */
    imageAlignment: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].includes(value);
      },
    },
    /**
     * If true, desktop image bleeds to edge of viewport
     */
    desktopImageBleed: {
      type: Boolean,
      default: false,
    },
    /**
     * Desktop image to display in form of: {url, x, y}
     */
    desktopImg: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * Mobile image to display in form of: {url, x, y}
     */
    mobileImg: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * Alt text of image
     */
    altText: {
      type: String,
      default: '',
    },
    /**
     * Text to display as subhead above the title
     */
    subhead: String,
    /**
     * Html string of title to display
     */
    title: String,
    /**
     * Class to apply to the split callout title.  Refer BaseTout for more information
     */
    titleClass: {
      type: String,
      default: 'heading-1',
    },
    /**
     * Html string of copy to display
     */
    copy: String,
    /**
     * Link Object to link to from CTA
     */
    link: Object,
    /**
     * Label for the CTA link
     */
    linkLabel: String,
  },
  computed: {
    toutTheme() {
      return this.theme === 'dark' ? 'negative' : 'positive';
    },
    toutLink() {
      return this.link && this.link.url && this.linkLabel
        ? [
            {
              text: this.linkLabel,
              style: 'cta',
              link: this.link,
            },
          ]
        : null;
    },
  },
};
</script>

<style scoped lang="scss">
$split-callout-breakpoint: $screen-sm;
$split-callout-content-width: 40%;
$content-spacing-tablet: $spacing-200;
$content-spacing-desktop: $spacing-400;
$vertical-spacing-desktop: $spacing-300;

.split-callout-container {
  position: relative;
  overflow: hidden;
}

.mobile-background {
  position: absolute;
  top: $spacing-400;
  left: 0;
  width: 100%;
  height: calc(100% - #{$spacing-400});

  @media (min-width: $split-callout-breakpoint) {
    display: none;
  }
}

.split-callout-inner {
  position: relative;

  @media (min-width: $split-callout-breakpoint) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    &.image-align-right {
      flex-direction: row-reverse;
    }
  }
}

.split-callout-content-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding: $spacing-200 0 $spacing-500;

  @media (min-width: $split-callout-breakpoint) {
    width: $split-callout-content-width;
    min-width: $split-callout-content-width;
    padding: 0 $container-gutter;
  }
}

.split-callout-content-inner {
  position: relative;

  @media (min-width: $split-callout-breakpoint) {
    display: flex;
    align-items: center;
    min-height: calc(100% - #{$spacing-800});
    padding: $vertical-spacing-desktop 0;
  }
}

.desktop-background {
  display: none;

  @media (min-width: $split-callout-breakpoint) {
    display: block;
    position: absolute;
    top: 0;
    right: calc((#{$container-gutter} + #{$content-spacing-tablet}) * -1);
    width: 100vw;
    height: 100%;

    .image-align-right & {
      left: calc((#{$container-gutter} + #{$content-spacing-tablet}) * -1);
    }
  }

  @media (min-width: $screen-lg) {
    right: calc((#{$container-gutter} + #{$content-spacing-desktop}) * -1);

    .image-align-right & {
      left: calc((#{$container-gutter} + #{$content-spacing-desktop}) * -1);
    }
  }
}

.split-callout-content {
  position: relative;
}

.split-callout-image-container {
  position: relative;
  width: 100%;
  z-index: 1;

  @media (min-width: $split-callout-breakpoint) {
    width: calc(100% - #{$split-callout-content-width});
    min-width: calc(100% - #{$split-callout-content-width});
    margin-top: -$vertical-spacing-desktop;
    padding-top: $vertical-spacing-desktop * 2;
  }

  @media (min-width: $screen-lg) {
    margin: 0;
    padding: 0;
  }
}

.split-callout-image {
  position: relative;
  width: 100%;
  height: 0;

  /deep/ img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: $split-callout-breakpoint) {
    .desktop-image-bleed & {
      width: calc(100% + #{$container-gutter});
      min-width: calc(100% + #{$container-gutter});
      left: -$container-gutter;
    }

    .desktop-image-bleed.image-align-right & {
      left: 0;
    }
  }

  &.mobile-image {
    display: block;

    @media (min-width: $split-callout-breakpoint) {
      display: none;
    }
  }

  &.desktop-image {
    display: none;

    @media (min-width: $split-callout-breakpoint) {
      display: block;
    }
  }
}
</style>

<docs>
### Examples

#### Default display
```jsx
<split-callout
  title="Living True to the Trail with Robin Hill"
  subhead="Local Voices"
  link="'/some/path"
  link-label="Learn More"
  :desktop-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
  :mobile-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
/>
<icon-definitions />
```

#### Image aligned left with dark topo theme
```jsx
<split-callout
  title="Living True to the Trail with Robin Hill"
  subhead="Local Voices"
  link="'/some/path"
  link-label="Learn More"
  theme="dark"
  topo
  :desktop-img="{
    url: 'https://placeimg.com/1000/1000/any',
    x: 1000,
    y: 1000
  }"
  :mobile-img="{
    url: 'https://placeimg.com/600/400/any',
    x: 600,
    y: 400
  }"
  image-alignment="right"
/>
<icon-definitions />
```

#### Gray topo theme, with smaller heading and copy
```jsx
<split-callout
  title="Giving is what we do."
  titleClass="heading-3"
  :copy="text.string.long"
  link="'/some/path"
  link-label="Learn More"
  theme="light-gray"
  topo
  :desktop-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
  :mobile-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
  image-alignment="right"
/>
<icon-definitions />
```

#### Gray theme, with image bleeding to edge of viewport at desktop
```jsx
<split-callout
  title="Rubberized Toe Cap"
  titleClass="heading-3"
  copy="Donec vehicula fermentum scelerisque. Aliquam arcu sem, mollis id ultrices vitae, efficitur sed quam. Vestibulum pulvinar nisl risus, a lacinia felis tristique vel. Sed vel ultricies augue. Suspendisse imperdiet condimentum augue a facilisis. Donec sed enim quis dui condimentum varius ac eget orci. "
  link="'/some/path"
  link-label="Learn More"
  theme="light-gray"
  :desktop-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
  :mobile-img="{
    url: 'https://placeimg.com/400/300/any',
    x: 400,
    y: 300
  }"
  desktop-image-bleed
/>
<icon-definitions />
```
</docs>
