<template>
  <div class="parallax" ref="parallaxWrapper">
    <div class="parallax-container" ref="parallaxContent">
      <base-video
        v-if="video !== undefined"
        :video-url="video"
        class="parallax-background"
        :lazy="false"
      ></base-video>
      <base-picture
        v-else
        :desktop-img="desktopImage"
        :tablet-img="tabletImage"
        :mobile-img="mobileImage"
        :alt-text="altText"
        class="parallax-background"
        :lazy="false"
      ></base-picture>
    </div>
  </div>
</template>

<script>
import BasePicture from '../base/BasePicture';
import BaseVideo from '../base/BaseVideo';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger.js';

/**
 * The parallax component renders content with a image, video or blank background.
 */

export default {
  name: 'Parallax',
  components: {BasePicture, BaseVideo},
  data() {
    return {
      parallaxTrigger: null
    };
  },
  computed: {
    parallaxWrapper() {
      return this.$refs.parallaxWrapper;
    },
    parallaxContent() {
      return this.$refs.parallaxContent;
    }
  },
  props: {
    /**
     * Desktop background image
     */
    desktopImage: {
      type: String
    },
    /**
     * Tablet background image
     */
    tabletImage: {
      type: String
    },
    /**
     * Mobile background image
     */
    mobileImage: {
      type: String
    },
    /**
     * Background image alt text
     */
    altText: {
      type: String
    },
    /**
     * Video background
     */
    video: {
      type: String
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    this.parallaxTrigger = gsap.to(this.parallaxContent, {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: this.parallaxWrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  },
  beforeDestroy() {
    this.parallaxTrigger.kill();
  }
};
</script>

<style scoped lang="scss">
.parallax {
  position: relative;
  height: 60vh;
  overflow: hidden;
  background-color: $color-gray-1000;

  @media (min-width: $navigation-breakpoint) {
    height: 40vw;
  }

  .parallax-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150%;
    will-change: transform;
  }

  .parallax-background,
  /deep/ img,
  /deep/ video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<docs>
  ### Examples

  ### Background Image Only
  ```jsx
    const content = {
      desktop: '/fpo/1920x560-dark.jpg',
      tablet: '/fpo/800x800-dark.jpg',
      mobile: '/fpo/800x400-dark.jpg',
      altText: 'Parallax Alt Tag',
    };

    <parallax :desktop-image="content.desktop" :tablet-image="content.tablet" :mobile-image="content.mobile" :alt-text="content.altText"></parallax>
  ```

  ### Video Background
  ```jsx
    <parallax :video="video"></parallax>
  ```
</docs>
