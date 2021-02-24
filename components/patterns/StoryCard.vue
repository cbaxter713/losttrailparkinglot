<template>
  <base-link class="story-card" :cms-link="linkObj" @click.native="linkClicked">
    <theme
      class="story-card-inner"
      @mouseenter.native="hovered = true"
      @mouseleave.native="hovered = false"
    >
      <div class="story-image-wrapper">
        <image-hover
          class="story-card-image"
          :mobile-img="image"
          :alt-text="altText"
          :hovered="hovered"
        ></image-hover>
      </div>
      <div class="story-card-content">
        <h3 v-if="subhead" class="story-subhead subheading-100 subheading-gray">{{ subhead }}</h3>
        <h2 v-if="title" class="story-title">{{ title }}</h2>
      </div>
    </theme>
  </base-link>
</template>

<script>
import Theme from './Theme';
import ImageHover from '../motion/ImageHover';

export default {
  name: 'StoryCard',
  components: {ImageHover, Theme},
  data() {
    return {
      hovered: false,
    };
  },
  props: {
    subhead: String,
    title: String,
    image: String,
    altText: String,
    linkObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    linkClicked() {
      this.$emit('linkClicked');
    },
  },
};
</script>

<style scoped lang="scss">
$story-card-content-breakpoint: $screen-xl;

.story-card {
  display: block;
  width: 100%;
  max-width: 600px;
  height: 100%;
  text-decoration: none;
}

.story-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.story-image-wrapper {
  position: relative;
  background-color: $color-gray-100;
}

.default-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7rem;
  height: 7rem;
  transform: translate3d(-50%, -50%, 0);
  color: $color-gray-200;
}

.story-card-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.6666%;

  /deep/ img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.story-card-content {
  position: relative;
  padding: $spacing-175 0;
  text-align: left;
}

.story-subhead.subheading-100 {
  margin: 0 0 $spacing-50 0;
  font-size: $font-size-100;
}

.story-title {
  margin: 0;
  font-size: $spacing-125;
  line-height: 1.4;
  color: $base-type-color;
}

.story-subtitle {
  margin-top: $spacing-100;

  /deep/ {
    * {
      margin: 0;
      font-size: $font-size-75;

      @media (min-width: $story-card-content-breakpoint) {
        font-size: $font-size-100;
      }
    }
  }
}

.story-cta {
  margin-top: $spacing-100;

  @media (min-width: $story-card-content-breakpoint) {
    font-size: $font-size-200;
  }
}
</style>

<docs>
```jsx
<story-card
  :image="images.thumbnail.url"
  subhead="Trail Tales"
  title="<h2>Solo Backpacking: Keeping Cool and Learning From It</h2>"
  :link-obj="{}"
/>
```
</docs>
