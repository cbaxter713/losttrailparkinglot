<template>
  <div class="search-results-container">
    <div class="search-results-inner">
      <nav
        class="search-nav"
        :class="{'has-results': searchComplete && finalResults && finalResults.length}"
      >
        <div class="search-nav-inner">
          <button
            class="search-nav-item"
            :class="{active: activeResults === 'product'}"
            :disabled="!productResults || !productResults.length"
            @click="setActiveResults('product')"
          >
            <span class="search-nav-item-inner">
              {{ cmsLabel('search_nav_products_label') }}
              <span class="results-count">
                <roller
                  v-if="mounted"
                  class="results-count-value"
                  :text="`${productResults.length}`"
                />
              </span>
            </span>
          </button>
          <button
            class="search-nav-item"
            :class="{active: activeResults === 'content'}"
            :disabled="!contentResults || !contentResults.length"
            @click="setActiveResults('content')"
          >
            <span class="search-nav-item-inner">
              {{ cmsLabel('search_nav_content_label') }}
              <span class="results-count">
                <roller
                  v-if="mounted"
                  class="results-count-value"
                  :text="`${contentResults.length}`"
                />
              </span>
            </span>
          </button>
        </div>
      </nav>
      <transition name="fade" mode="out-in">
        <div v-if="searchComplete" class="search-results" key="searchResults">
          <div v-if="finalResults && finalResults.length">
            <transition name="fade" mode="out-in">
              <div v-if="activeResults === 'product'" class="result-group" key="product-results">
                <ul class="search-results-list search-products">
                  <li
                    v-for="(product, index) in productResults"
                    :key="`search-result-product-${index}`"
                    class="search-result-item search-result-product"
                  >
                    <product-thumb-wrapper
                      :product="product"
                      :product-list-name="'search results'"
                      :product-category="'search results'"
                      :index="index"
                    />
                  </li>
                </ul>
              </div>
              <div v-else class="result-group" key="content-results">
                <ul class="search-results-list search-content">
                  <li
                    v-for="(item, index) in contentResults"
                    :key="`search-result-${index}`"
                    class="search-result-item search-result-content"
                  >
                    <search-content-result :result="item" />
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <div v-else class="no-results">
            <h3 class="h1">{{ cmsLabel('empty_search_result') }}</h3>
          </div>
        </div>
        <div v-else class="search-loading" key="searchLoading">
          <base-loading active />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import _has from 'lodash/has';
import BaseLoading from '../base/BaseLoading';
import ProductThumbWrapper from '../product/ProductThumbWrapper';
import SearchContentResult from './SearchContentResult';

export default {
  name: 'SearchResults',
  components: {
    Roller: () => import('vue-roller'),
    SearchContentResult,
    ProductThumbWrapper,
    BaseLoading,
  },
  data() {
    return {
      searchComplete: false,
      searchResults: {},
      activeResults: 'product',
      mounted: false,
    };
  },
  computed: {
    ...mapGetters({
      searchQuery: 'search/searchQuery',
    }),
    productResults() {
      return this.searchResults.products || [];
    },
    contentResults() {
      let content = [];
      if (this.searchResults.content && this.searchResults.content.length) {
        content = this.searchResults.content.map((result) => {
          const link = this.getContentLink(result);
          const title = this.getContentTitle(result);
          const tags = this.getContentTags(result);
          const image = this.getContentImage(result);

          return {link, image, title, tags};
        });
      }

      // Float results with full text match titles to the top
      content.sort((a) => {
        const title = a.title.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        if (query.includes(title)) {
          return -1;
        }
        return 0;
      });

      return content;
    },
    finalResults() {
      return [...this.productResults, ...this.contentResults];
    },
  },
  methods: {
    getContentLink(result) {
      return this.cmsLinkToLinkType(result);
    },
    getContentTitle(result) {
      const title = result.data.title;

      if (Array.isArray(title)) {
        return this.$prismic.asText(title);
      }
      return title;
    },
    getContentTags(result) {
      return result.tags && result.tags.length ? result.tags.join(', ') : '';
    },
    getContentImage(result) {
      if (_has(result, 'data.hero_image.thumb.url')) {
        return result.data.hero_image.thumb.url;
      } else if (_has(result, 'data.meta_image.url')) {
        return result.data.meta_image.url;
      }
      return null;
    },
    setActiveResults(type) {
      this.activeResults = type;
    },
    searchResultClicked() {
      this.$store.dispatch('navigation/deactivateNav');
    },
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler: async function () {
        if (this.searchQuery) {
          this.searchComplete = false;
          this.searchResults = await this.$store.dispatch(
            'search/fullSiteSearch',
            this.searchQuery
          );

          if (!this.productResults.length && this.contentResults.length) {
            this.activeResults = 'content';
          } else if (this.productResults.length && !this.contentResults.length) {
            this.activeResults = 'product';
          }

          this.searchComplete = true;
        }
      },
    },
  },
  mounted() {
    this.mounted = true;
  },
};
</script>

<style scoped lang="scss">
.search-nav {
  position: relative;
  opacity: 0;

  &.has-results {
    opacity: 1;
    transition: opacity $transition-base;
  }

  @media (min-width: $navigation-breakpoint) {
    height: $spacing-450;
  }
}

.search-nav-inner {
  display: flex;
  justify-content: center;
  padding-bottom: $spacing-200;
}

.search-nav-item {
  position: relative;
  padding: $spacing-100;
  font-family: $font-family-headings;
  font-size: $font-size-150;
  line-height: 1.25;

  @media (min-width: $navigation-breakpoint) {
    position: absolute;
    top: 50%;
    font-size: $font-size-200;
    padding: $spacing-100 $spacing-150;
    text-align: left;
    transform: translateY(-50%);

    &:first-of-type {
      right: calc(50%);
    }

    &:last-of-type {
      left: calc(50%);
    }
  }

  &[disabled] {
    opacity: 0.5;
  }
}

.search-nav-item-inner {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.875rem;
    width: 100%;
    height: 6px;
    border-radius: 2px;
    background-color: $color-primary;
    opacity: 0;
    transition: opacity $transition-base;
  }

  .active & {
    &::after {
      opacity: 1;
    }
  }
}

.results-count {
  position: relative;
  width: $spacing-200;
  height: 100%;
  display: inline-block;
  margin-left: $spacing-50;

  /deep/ .results-count-value {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(9px);
  }
}

.results-count-value {
  position: relative;
  color: $search-count-color;
}

.search-results-list {
  list-style: none;
}

.search-products {
  @media (min-width: 580px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $screen-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $screen-xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.search-content {
  display: grid;
  grid-row-gap: $spacing-175;
  grid-column-gap: $spacing-175;
  grid-template-columns: 1fr;

  @media (min-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $screen-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $screen-xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.search-loading {
  position: relative;
  width: 100%;
  height: 50px;

  @media (min-width: $navigation-breakpoint) {
    height: 200px;
  }
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: $navigation-breakpoint) {
    height: 100px;
  }
}
</style>
