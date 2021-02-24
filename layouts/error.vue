<template>
  <div class="error-page">
    <div class="error-container">
      <base-image
        image-src="/images/nacho-libre-corn.gif"
        alt-text="Background Image"
        class="error-background-image"
      />
      <theme theme="dark" class="error-theme-wrapper">
        <div class="error-content">
          <h5 class="tracked status-code">404</h5>
          <h1 class="title">How the hell did you even get here?</h1>
          <h3 class="error-message">{{ error.message }}</h3>
          <base-cta-link size="200" :url="routes.home()" :external-link="false">
            Back To the Lot
          </base-cta-link>
        </div>
      </theme>
    </div>
  </div>
</template>

<script>
import Theme from '../components/patterns/Theme';
import BaseButton from '../components/base/BaseButton';
import BaseImage from '@/components/base/BaseImage';
import BaseCtaLink from '@/components/base/BaseCtaLink';

export default {
  name: 'error',
  layout: 'static',
  components: {BaseCtaLink, BaseImage, BaseButton, Theme},
  transition: {
    name: 'page',
    mode: 'out-in',
  },
  head: {
    title: 'Page Not Found',
  },
  props: ['error'],
};
</script>

<style scoped lang="scss">
.error-page {
  height: 100vh;
  width: 100%;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: $color-gray-900;
  padding: $component-spacing-mobile $gutter;
  height: 100%;

  @media (min-width: $screen-sm) {
    padding: $component-spacing ($gutter * 2);
  }
}

.error-background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-level-below-page;
  opacity: 0.3;

  /deep/ img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.error-theme-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.error-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20rem;
  z-index: $z-index-level-page;
}

.status-code {
  margin-bottom: $spacing-100;
  margin-top: 0;
  font-size: $font-size-300;
}

.title {
  /deep/ h1 {
    max-width: 60rem;
    margin-top: 0;
    margin-right: auto;
    margin-left: auto;
  }
}

.error-message {
  max-width: $content-width;
  margin-left: auto;
  margin-right: auto;
  font-size: $font-size-250;
}
</style>
