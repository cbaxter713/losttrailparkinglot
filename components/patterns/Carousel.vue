<template>
  <div class="carousel">
    <vue-slick-carousel
      v-bind="finalSettings"
      @init="carouselInit"
      @beforeChange="beforeChange"
      @afterChange="afterChange"
      ref="carousel"
    >
      <template #prevArrow="arrowOption">
        <button
          class="carousel-arrow prev-arrow"
          :title="`To slide ${getArrowIndex(arrowOption)} of ${arrowOption.slideCount}`"
        >
          <base-icon :icon="'chevron-left'" class="icon"></base-icon>
        </button>
      </template>
      <slot />
      <template #nextArrow="arrowOption">
        <button
          class="carousel-arrow next-arrow"
          :title="`To slide ${getArrowIndex(arrowOption, true)} of ${arrowOption.slideCount}`"
        >
          <base-icon :icon="'chevron-right'" class="icon"></base-icon>
        </button>
      </template>
    </vue-slick-carousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import BaseIcon from '../base/BaseIcon';

/**
 * Carousel pattern component that can be used to show any type of
 * content within a carousel.  This leverages vue-slick-carousel
 * which has more documentation here: https://github.com/gs-shop/vue-slick-carousel
 */

export default {
  name: 'Carousel',
  components: {BaseIcon, VueSlickCarousel},
  props: {
    /**
     * VueSlickCarousel prop settings as documented here:
     * https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#props
     */
    carouselSettings: {
      type: Object,
      default: () => {
        return {
          arrows: true,
          dots: true
        };
      }
    }
  },
  computed: {
    carousel() {
      return this.$refs.carousel;
    },
    finalSettings() {
      return {
        ...this.carouselSettings,
        dotsClass: 'carousel-dots'
      };
    }
  },
  methods: {
    previousSlide() {
      this.carousel.prev();
    },
    nextSlide() {
      this.carousel.next();
    },
    goToSlide(index) {
      this.carousel.goTo(index);
    },
    play() {
      this.carousel.play();
    },
    pause() {
      this.carousel.pause();
    },
    carouselInit() {
      this.$emit('carouselInit');
    },
    beforeChange($event) {
      this.$emit('beforeChange', $event);
    },
    afterChange($event) {
      this.$emit('afterChange', $event);
    },
    getArrowIndex(option, next) {
      if (next) {
        return option.currentSlide + 1 === option.slideCount ? 1 : option.currentSlide + 2;
      } else {
        return option.currentSlide === 0 ? option.slideCount : option.currentSlide;
      }
    }
  }
};
</script>

<style scoped lang="scss">
$carousel-breakpoint: $screen-sm;

.carousel /deep/ {
  position: relative;
  width: 100%;
  padding-bottom: $spacing-300;

  .carousel-dots {
    position: absolute;
    bottom: -$spacing-200;
    left: 50%;
    display: flex !important;
    list-style: none;
    transform: translateX(-50%);

    li {
      margin: 0 $spacing-50;

      &.slick-active button {
        background-color: $color-primary;
      }
    }

    button {
      position: relative;
      width: $spacing-200;
      height: 6px;
      border-radius: 3px;
      background-color: $color-gray-200;
      font-size: 0;
      transition: background-color $transition-base;

      &:active,
      &:focus {
        outline: none;
      }

      &::before {
        content: '';
        position: absolute;
        top: -$spacing-100;
        left: 0;
        height: calc(100% + #{$spacing-200});
        width: 100%;
      }
    }
  }

  .slick-slide div {
    &:active,
    &:focus {
      outline: none !important;
    }
  }

  img {
    user-select: none;
    pointer-events: none;
  }
}

.carousel-arrow {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  width: $spacing-225;
  height: $spacing-225;
  background-color: rgba($color-gray-900, 0.5);
  border-radius: 50%;
  transform: translateY(-50%);
  transition: background-color $transition-base;
  z-index: 1;

  &.prev-arrow {
    left: $spacing-100;
  }

  &.next-arrow {
    right: $spacing-100;
  }

  &:hover {
    background-color: rgba($color-gray-900, 0.7);
  }

  &:active,
  &:focus {
    outline: none;
  }

  /deep/ svg {
    width: $spacing-112;
    height: $spacing-112;
    fill: $color-white;
  }

  @media (min-width: $carousel-breakpoint) {
    width: $spacing-300;
    height: $spacing-300;

    &.prev-arrow {
      left: $container-gutter / 2;
    }

    &.next-arrow {
      right: $container-gutter / 2;
    }

    /deep/ svg {
      width: $spacing-150;
      height: $spacing-150;
    }
  }
}
</style>

<docs>
### Default carousel with images
```jsx
<carousel>
  <div v-for="i in 5" :key="i" class="img-wrapper">
    <img src="https://placeimg.com/2000/1000/any" />
  </div>
</carousel>
<icon-definitions />
```

### With custom options
```jsx
<carousel :carousel-settings="{centerMode: true, focusOnSelect: true, slidesToShow: 3, dots: true}">
  <div v-for="i in 5" :key="i" class="img-wrapper" >
    <img src="https://placeimg.com/1000/500/any" />
  </div>
</carousel>
<icon-definitions />
```
</docs>
