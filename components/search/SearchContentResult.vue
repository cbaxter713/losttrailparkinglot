<template>
  <story-card
    :subhead="result.tags"
    :title="result.title"
    :image="result.image"
    :alt-text="result.title"
    :link-obj="result.link"
  />
</template>

<script>
import StoryCard from '../patterns/StoryCard';
export default {
  name: 'SearchContentResult',
  components: {StoryCard},
  props: {
    result: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleLinkClick() {
      this.$emit('linkClicked');
    }
  }
};
</script>

<style scoped lang="scss">
.search-content-result {
  display: flex;
  padding: $spacing-150 0;
  border-bottom: 1px solid $color-gray-200;
  text-decoration: none;
}

.result-image-container {
  margin-right: $spacing-75;
  width: 80px;
  min-width: 80px;

  @media (min-width: $screen-sm) {
    margin-right: $spacing-100;
    width: 120px;
    min-width: 120px;
  }
}

.result-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  /deep/ img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    .rv-image-result & {
      object-fit: contain;
    }
  }
}

.result-content {
  text-align: left;
}

.result-title {
  margin: 0 0 $spacing-100 0;
  font-size: $font-size-300;
  text-transform: none;
}

.result-description {
  margin: 0;
  color: $base-type-color;
  line-height: 1.25;
}
</style>
