<template>
  <stacked-component class="image-carousel" v-bind="$props" spacing>
    <carousel class="image-carousel-wrapper" :carousel-settings="options">
      <div
        v-for="(image, index) in images"
        :key="`related-story-${index}`"
        class="image-carousel-item"
      >
        <div class="image-carousel-item-inner">
          <base-picture
            :desktop-img="image.desktopImg"
            :mobile-img="image.mobileImg"
            :breakpoint-desktop="768"
            :alt-text="image.altText"
            :lazy="false"
          />
        </div>
      </div>
    </carousel>
  </stacked-component>
</template>

<script>
import Carousel from '../patterns/Carousel';
import BasePicture from '../base/BasePicture';
import StackedComponent from '../layout/StackedComponent';
import {themeProps} from '../../mixins/sharedProps';

/**
 * Displays many images in an infinite carousel format.
 */

export default {
  name: 'ImageCarousel',
  components: {StackedComponent, BasePicture, Carousel},
  mixins: [themeProps],
  props: {
    images: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    options() {
      return {
        centerMode: true,
        centerPadding: '15%',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        initialSlide: 0,
        speed: 500,
        dots: true,
        arrows: !this.isMobile
      };
    }
  }
};
</script>

<style scoped lang="scss">
.image-carousel-item {
  position: relative;
  width: 100%;
  padding: 0 $spacing-50;

  @media (min-width: $related-stories-breakpoint) {
    padding: 0 $spacing-100;
  }
}

.image-carousel-item-inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  @media (min-width: $screen-sm) {
    padding-bottom: 66.6667%;
  }

  /deep/ img {
    @include absoluteAndFill;

    object-fit: cover;
  }
}

.image-carousel-wrapper.carousel {
  padding-bottom: 0;
}
</style>

<docs>
#### Default Carousel
```jsx
const demoImages = [
{
  desktopImg: 'https://placeimg.com/2000/1500/any',
  mobileImg: 'https://placeimg.com/700/700/any',
  altText: 'something',
},
{
  desktopImg: 'https://placeimg.com/2003/1503/any',
  mobileImg: 'https://placeimg.com/703/703/any',
  altText: 'something'
},
{
  desktopImg: 'https://placeimg.com/2001/1501/any',
  mobileImg: 'https://placeimg.com/701/701/any',
  altText: 'something'
},
{
  desktopImg: 'https://placeimg.com/2002/1502/any',
  mobileImg: 'https://placeimg.com/702/702/any',
  altText: 'something'
}
]
<image-carousel :images="demoImages" />
```

#### Carousel with topo background
```jsx
const demoImages = [
{
desktopImg: 'https://placeimg.com/2000/1500/any',
mobileImg: 'https://placeimg.com/700/700/any',
altText: 'something',
},
{
desktopImg: 'https://placeimg.com/2003/1503/any',
mobileImg: 'https://placeimg.com/703/703/any',
altText: 'something'
},
{
desktopImg: 'https://placeimg.com/2001/1501/any',
mobileImg: 'https://placeimg.com/701/701/any',
altText: 'something'
},
{
desktopImg: 'https://placeimg.com/2002/1502/any',
mobileImg: 'https://placeimg.com/702/702/any',
altText: 'something'
}
]
<image-carousel :images="demoImages" topo theme="light-gray" />
```
</docs>
