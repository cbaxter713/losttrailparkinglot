<template>
  <transition name="fade" mode="out-in">
    <div v-if="storiesLoaded" class="story-results">
      <transition name="fade" mode="out-in">
        <transition-group v-if="storiesToShow.length" tag="div" name="tile-list" class="story-grid">
          <story-card
            v-for="(story, index) in storiesToShow"
            :key="`story-card-${index}`"
            class="story-grid-item"
            :link-obj="story.link"
            :title="story.title"
            :subhead="story.subhead"
            :image="story.image"
            :alt-text="story.altText"
          />
        </transition-group>
        <div v-else class="no-stories-container">
          <layout-container>
            <h2>There are no stories that match</h2>
          </layout-container>
        </div>
      </transition>
    </div>
    <div v-else class="stories-loading">
      <base-loading active />
    </div>
  </transition>
</template>

<script>
import BaseLoading from '../base/BaseLoading';
import LayoutContainer from '../layout/LayoutContainer';
import StoryCard from './StoryCard';
/**
 * Displays story tiles in a fancy grid format.
 * It is meant to display some intro title/copy in the first grid spot
 * followed by a fancy grid of story cards.  Displays up to 5 stories.
 */

export default {
  name: 'StoryGrid',
  components: {BaseLoading, LayoutContainer, StoryCard},
  props: {
    /**
     * Array of stories to display, with the following structure:
     * {
     *   url: String,
     *   title: HTML,
     *   subtitle: HTML,
     *   squareImage: String,
     *   tallImage: String,
     *   wideImage: String,
     *   altText: String,
     *   ctaLabel: String,
     *   ctaTheme: String,
     *   verticalPosition: String,
     *   horizontalPosition: String
     * }
     */
    stories: {
      type: Array,
      default: () => {
        return [];
      }
    },
    maxStories: {
      type: Number,
      required: false,
      default: 5
    },
    storiesLoaded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    storiesToShow() {
      return !this.fancyGrid && this.stories.length > this.maxStories
        ? this.stories.slice(0, this.maxStories)
        : this.stories;
    }
  }
};
</script>

<style scoped lang="scss">
.story-grid {
  display: grid;
  grid-column-gap: $spacing-175;
  grid-row-gap: $spacing-150;
  grid-template-rows: auto;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $screen-sm) {
    grid-row-gap: $spacing-200;
  }

  @media (min-width: $screen-md) {
    grid-column-gap: $spacing-200;
    grid-row-gap: $spacing-225;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $screen-xxl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.story-grid-item {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-decoration: none;

  @media (min-width: $blog-landing-breakpoint) {
    margin: 0;
  }

  /deep/ {
    .content-section {
      flex-grow: 1;
    }
  }
}

.story-inner {
  width: 100%;
  height: 100%;
}

.no-stories-container {
  text-align: center;
  padding: $spacing-150 0;

  @media ($screen-sm) {
    padding: $spacing-150 0;
  }
}

.stories-loading {
  position: relative;
  width: 100%;
  height: 300px;
}
</style>
