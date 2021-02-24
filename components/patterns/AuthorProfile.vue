<template>
  <stacked-component class="author-profile" spacing>
    <div class="author-profile-inner">
      <div v-if="image" class="author-image-container">
        <base-image :image-src="image" :alt-text="name" class="author-image" />
      </div>
      <div class="author-details" :class="{'no-location': !location}">
        <h5 class="author-name">{{ name }}</h5>
        <p class="small author-location">{{ location }}</p>
        <p v-if="description" class="small author-description">{{ description }}</p>
      </div>
    </div>
  </stacked-component>
</template>

<script>
import BaseImage from '../base/BaseImage';
import StackedComponent from '../layout/StackedComponent';
export default {
  name: 'AuthorProfile',
  components: {StackedComponent, BaseImage},
  props: {
    image: String,
    name: String,
    location: String,
    description: String
  }
};
</script>

<style scoped lang="scss">
.author-profile-inner {
  display: flex;
}

.author-image-container /deep/ {
  width: $spacing-700;
  min-width: $spacing-700;
  height: $spacing-700;
  margin-right: $spacing-150;

  @media (min-width: $screen-sm) {
    width: $spacing-1000;
    min-width: $spacing-1000;
    height: $spacing-1000;
    margin-right: $spacing-250;
  }

  .author-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.author-name {
  margin: 0;

  .no-location & {
    @include fancyTitle;
  }
}

.author-location.author-location,
.author-description.author-description {
  @media (min-width: $screen-sm) {
    font-size: $font-size-100;
  }

  &::after {
    height: 6px;
    width: $spacing-200;
    border-radius: 4px;
  }
}

.author-location {
  @include fancyTitleSmall;

  margin-top: $spacing-50;
}

.author-description {
  margin: $spacing-100 0 0 0;
}
</style>
