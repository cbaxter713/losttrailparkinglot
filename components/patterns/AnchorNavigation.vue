<template>
  <div class="anchor-navigation" :class="[{'sticky-nav': sticky}]">
    <theme :theme="theme" class="anchor-navigation-inner">
      <div class="anchor-navigation-container">
        <nav>
          <ul class="anchor-nav-list">
            <li
              v-for="(item, index) in anchorLinks"
              :key="`anchor-link-${index}`"
              class="anchor-nav-item"
            >
              <a class="anchor-nav-link" href="#" @click.prevent="scrollToAnchor(item.id)">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </theme>
  </div>
</template>

<script>
import LayoutContainer from '../layout/LayoutContainer';
import Theme from './Theme';

/**
 * Navigation list of anchor links to link to on the page
 */

export default {
  name: 'AnchorNavigation',
  components: {Theme, LayoutContainer},
  props: {
    /**
     * Array of anchor links to display, where each object has an 'id' and 'label'
     */
    anchorLinks: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * Whether or not to make the anchor nav sticky within its parent container
     */
    sticky: {
      type: Boolean,
      default: false,
    },
    /**
     * Theme of styling around the anchor navigation
     */
    theme: {
      type: String,
      default: 'light-gray',
    },
  },
  methods: {
    scrollToAnchor(id) {
      this.$scrollTo(`#${id}`, 600, {
        offset: this.isMobile ? -44 : this.sticky ? -100 : -32,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.anchor-navigation {
  &.sticky-nav {
    position: sticky;
    top: 0;
    z-index: $sticky-nav-z-index;
  }
}

.anchor-navigation-inner {
  padding: $spacing-150 0;
}

.anchor-navigation-container {
  @media (min-width: $screen-md) {
    padding: 0 $gutter-mobile;
  }
}

.anchor-nav-list {
  @include rawList;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;

  @media (min-width: $screen-md) {
    justify-content: center;
  }
}

.anchor-nav-link {
  display: block;
  margin: 0 $spacing-50;
  padding: $spacing-50 $spacing-100;
  color: $base-type-color;
  font-family: $font-family-condensed;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  .theme-dark &,
  .theme-gray & {
    color: $reversed-type-color;
  }

  @media (min-width: $screen-md) {
    margin: 0;
  }
}
</style>

<docs>
  ### Example

  #### Default anchor nav
  ```jsx
  const links = [{id: 1, label: 'Skiing'}, {id: 2, label: 'Biking'}, {id: 3, label: 'Climbing'}];
  <anchor-navigation :anchor-links="links" />
  ```

  #### Dark Theme
  ```jsx
  const links = [{id: 1, label: 'Skiing'}, {id: 2, label: 'Biking'}, {id: 3, label: 'Climbing'}];
  <anchor-navigation :anchor-links="links" theme="dark" />
  ```

  #### Light Theme
  ```jsx
  const links = [{id: 1, label: 'Skiing'}, {id: 2, label: 'Biking'}, {id: 3, label: 'Climbing'}];
  <anchor-navigation :anchor-links="links" theme="light" />
  ```
</docs>
