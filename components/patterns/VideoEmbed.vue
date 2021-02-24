<template>
  <stacked-component class="video-embed" spacing :topo="topo" :theme="theme">
    <layout-container
      :disabled="containerWidth === 'full-screen'"
      :text-block="containerWidth === 'text-block-width'"
    >
      <div v-if="title" v-html="title" class="title"></div>
      <div v-if="video.html" class="embed-wrapper" v-html="video.html"></div>
      <div v-else-if="url" class="embed-wrapper">
        <iframe
          :src="getEmbedUrlFromWatchUrl(url)"
          class="embed-iframe"
          frameborder="0"
          allowfullscreen
        />
      </div>
    </layout-container>
  </stacked-component>
</template>

<script>
import LayoutContainer from '../layout/LayoutContainer';
import StackedComponent from '../layout/StackedComponent';
import Theme from './Theme';

export default {
  components: {StackedComponent, LayoutContainer},
  name: 'VideoEmbed',
  extends: Theme,
  props: {
    video: {
      type: Object,
      default: () => {
        return {};
      },
    },
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: false,
    },
    containerWidth: {
      type: String,
      default: 'text-block-width',
      validator: (value) => {
        return ['text-block-width', 'container-width', 'full-screen'].includes(value);
      },
    },
  },
  methods: {
    getYoutubeIdFromWatchUrl(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    },
    getEmbedUrlFromWatchUrl(url) {
      const videoId = this.getYoutubeIdFromWatchUrl(url);
      return `//www.youtube.com/embed/${videoId}`;
    },
  },
};
</script>

<style scoped lang="scss">
.video-component {
  text-align: center;
}

.embed-wrapper {
  padding-bottom: 56.25%;
  position: relative;

  /deep/ iframe {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    top: 0;
    height: 100%;
  }
}

.title /deep/ {
  & > * {
    @include fancyTitle;
  }
}
</style>
