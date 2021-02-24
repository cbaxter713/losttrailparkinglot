<template>
  <stacked-component
    background-image
    :spacing="hasSpacing"
    class="gallery"
    :class="{'full-width': !inContainer}"
  >
    <theme v-if="topo" theme="light" topo class="gallery-topo-background" />
    <layout-container :disabled="!inContainer">
      <div
        class="grid-layout"
        :class="`grid-layout-${images.length} image-align-${imageAlignment} image-height-${imageHeight}`"
      >
        <figure
          v-for="(image, index) in images"
          :key="`grid-image-${index}`"
          class="grid-item"
          :class="[`grid-item-${index + 1}`, {'has-caption': image.altText}]"
        >
          <base-picture
            v-if="image.mobileUrl"
            :desktop-img="image.url"
            :mobile-img="image.mobileUrl"
            :alt-text="image.altText"
            root-margin="1000px"
            class="grid-item-image"
          />
          <base-image
            v-else
            :key="`grid-image-${index}`"
            :image-src="image.url"
            :alt-text="image.altText"
            class="grid-item-image"
          ></base-image>
          <figcaption v-if="image.altText" class="grid-item-caption">
            {{ image.altText }}
          </figcaption>
        </figure>
      </div>
    </layout-container>
  </stacked-component>
</template>

<script>
import StackedComponent from '../layout/StackedComponent';
import BaseImage from '../base/BaseImage';
import LayoutContainer from '../layout/LayoutContainer';
import Theme from '../patterns/Theme';
import BasePicture from '../base/BasePicture';
/**
 * The Galley component displays 1-4 images in a stylized layout.  This is a flexible
 * component that can achieve different displays based upon how many images are provided.
 * 1 image displays as a single image, either in container or full screen width.
 * 2 images display side by side.
 * 3 images display in a grid, with 2 smaller images stacked next to a large image.
 * 4 images display in a 2 up grid
 */

export default {
  name: 'Gallery',
  components: {BasePicture, Theme, LayoutContainer, BaseImage, StackedComponent},
  props: {
    /**
     * Array of images to display. Each element of the array should be in the form of
     * {
     *   url: '/path/of/image.png',
     *   mobileUrl: '/path/of/mobile'
     *   alt: 'alt text here'
     * }
     * The alt text is used as such, and also as a caption on the image.
     */
    images: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * Display images within the layout container or not
     */
    inContainer: {
      type: Boolean,
      default: true,
    },
    /**
     * Alignment of large image in desktop layout of 3 images
     */
    imageAlignment: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].includes(value);
      },
    },
    imageHeight: {
      type: String,
      default: 'short',
      validator: (value) => {
        return ['short', 'tall'].includes(value);
      },
    },
    topo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasSpacing() {
      return this.inContainer || (this.images && this.images.length > 1);
    },
  },
};
</script>

<style scoped lang="scss">
$gallery-breakpoint: $screen-sm;
$gallery-grid-spacing: $spacing-200;
$gallery-caption-spacing: $spacing-150;

.gallery {
  overflow: hidden;
}

.grid-item {
  position: relative;
  width: 100%;
  padding-bottom: $spacing-150;

  @media (min-width: $gallery-breakpoint) {
    padding: 0;
  }
}

.grid-item-caption {
  padding-top: $spacing-100;
  font-size: $font-size-50;
  color: $color-gray-500;
  line-height: 1;

  .full-width & {
    padding-left: $gutter-mobile;
  }

  @media (min-width: $gallery-breakpoint) {
    font-size: $font-size-75;

    .full-width & {
      padding-left: $container-gutter;
    }
  }
}

.grid-layout {
  position: relative;
  width: 100%;

  @media (min-width: $gallery-breakpoint) {
    display: grid;
    grid-gap: $gallery-grid-spacing;
    grid-template-areas: 'one two';
    grid-template-columns: 1fr 1fr;

    .grid-item-1 {
      grid-area: one;
    }

    .grid-item-2 {
      grid-area: two;
    }

    .grid-item-3 {
      grid-area: three;
    }

    .grid-item-4 {
      grid-area: four;
    }

    /deep/ img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-1 {
      display: flex;
    }

    &-3 {
      grid-template-areas:
        'one two'
        'one three';

      .grid-item-image {
        @media (min-width: $gallery-breakpoint) {
          height: 100%;
        }
      }

      .grid-item-2.has-caption {
        padding-bottom: $gallery-caption-spacing;
      }

      &.image-align-right {
        grid-template-areas:
          'one two'
          'three two';

        .grid-item-1.has-caption {
          padding-bottom: $gallery-caption-spacing;
        }

        .grid-item-2.has-caption {
          padding-bottom: 0;
        }
      }
    }

    &-4 {
      grid-template-areas:
        'one two'
        'three four';
    }
  }
}

.gallery-topo-background {
  position: absolute;
  bottom: -$component-spacing-mobile;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 0;

  @media (min-width: $navigation-breakpoint) {
    bottom: -$component-spacing-desktop;
  }
}
</style>

<docs>
### Examples

#### Single Image
```jsx
const galleryImages = [1].map(() => {
  return {
    url: 'https://placeimg.com/1500/900/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" />
```

#### Single Image not in container
```jsx
const galleryImages = [1].map(() => {
  return {
    url: 'https://placeimg.com/1500/900/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" :in-container="false" />
```

#### Two Images with topo
```jsx
const galleryImages = [1, 2].map(() => {
  return {
    url: 'https://placeimg.com/800/1090/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" topo />
```

#### Three Images - left aligned
```jsx
const galleryImages = [1, 2, 3].map((item, index) => {
  return {
    url: index === 0 ? 'https://placeimg.com/800/1090/any' : 'https://placeimg.com/1000/650/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" />
```

#### Three Images - right aligned
```jsx
const galleryImages = [1, 2, 3].map((item, index) => {
  return {
    url: index === 1 ? 'https://placeimg.com/800/1090/any' : 'https://placeimg.com/1000/656/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" image-alignment="right" />
```

#### Single Image not in container
```jsx
const galleryImages = [1, 2, 3, 4].map(() => {
  return {
    url: 'https://placeimg.com/1000/656/any',
    altText: 'alt text here'
  }
})
<gallery :images="galleryImages" :in-container="false" />
```
</docs>
