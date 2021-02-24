<template>
  <div v-if="showLoadingComponent" class="loading-page">
    <theme theme="dark" class="loading-content" :class="{active: showContent}">
      <div class="logo-container">
        <site-logo />
        <!--        <div class="loading-progress" :style="`height: ${percent}%`"></div>-->
        <!--        <img src="/img/bd-logo-transparent.png" alt="Black Diamond Logo" title="Page Loading..." />-->
      </div>
    </theme>
  </div>
</template>

<script>
import Theme from '../patterns/Theme';

export default {
  components: {Theme},
  data: () => ({
    loading: false,
    showLoadingComponent: false,
    showContent: false,
    animationTime: 700,
    percent: 0,
    maxDuration: 4000,
    timer: null,
    delayBeforeLoading: 300,
    newPageLoadBuffer: 1200,
  }),
  methods: {
    clear() {
      clearInterval(this.timer);
      this.timer = null;
    },
    start() {
      this.clear();
      this.percent = 0;
      this.loading = true;
      this.showLoadingComponent = true;
      this.startTimer();

      // Enough time to allow a quick routing to take place before
      // kicking off the custom loading
      setTimeout(() => {
        if (this.loading) {
          this.showContent = true;
        }
      }, this.delayBeforeLoading);
    },
    finish() {
      this.percent = 100;
      this.loading = false;

      // Enough time to let the page route and fade in
      setTimeout(() => {
        this.showContent = false;

        // Enough time to let the loading component fade out before hiding
        // the whole thing
        setTimeout(() => {
          this.showLoadingComponent = false;
          this.clear();
        }, this.animationTime);
      }, this.newPageLoadBuffer);
    },
    increase(num) {
      this.percent = Math.min(100, Math.floor(this.percent + num));
    },
    startTimer() {
      const cut = 10000 / Math.floor(this.maxDuration);
      this.timer = setInterval(() => {
        this.increase(cut);
      }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $route-loading-z-index;
}

.loading-content {
  width: 100%;
  height: 100%;
  background-color: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: $transition-route-loading;
  will-change: opacity;

  &.active {
    opacity: 1;
  }
}

.logo-container {
  position: relative;
  width: 175px;
  height: 175px;
  overflow: hidden;

  .loading-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $color-white;
    z-index: 0;
    transition: height 0.1s;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
