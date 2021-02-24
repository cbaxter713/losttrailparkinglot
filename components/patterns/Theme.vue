<template>
  <div class="theme" :class="['theme-' + theme, {'bg-topo': topo}]">
    <div class="theme-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {themeProps} from '../../mixins/sharedProps';

export default {
  name: 'Theme',
  mixins: [themeProps]
};
</script>

<style lang="scss">
.theme-contents-inner {
  position: relative;
}

.theme-light {
  background-color: $background-light-color;
}

.theme-dark,
.theme-primary,
.theme-gray {
  color: $reversed-type-color;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: $reversed-type-color;
  }

  .subheading-gray {
    color: $reversed-gray;
  }
}

.theme-dark {
  background-color: $background-dark-color;

  .btn-default {
    background-color: $color-white;
    color: $base-type-color;

    &:hover,
    &.active {
      background-color: $color-gray-200;
    }
  }

  a {
    color: $oboz-green;
    text-decoration: underline;

    &:hover {
      color: $oboz-green-accessible;
    }
  }
}

.theme-primary {
  background-color: $color-primary;
}

.theme-light-gray {
  background-color: $background-light-gray-color;
}

.theme-gray {
  background-color: $background-gray-color;
}
</style>
