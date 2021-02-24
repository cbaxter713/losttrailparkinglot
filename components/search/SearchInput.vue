<template>
  <div class="search-input-container" :class="{'input-focused': inputFocused}">
    <form
      :id="`search-form-${searchId}`"
      name="search-form"
      class="search-input-form"
      role="search"
      action="/search"
      method="GET"
      @submit.prevent="submitSearch"
    >
      <button class="search-button search-button-submit" type="submit" aria-label="Site Search">
        <base-icon icon="search" class="search-icon" />
      </button>
      <input
        id="search-input"
        name="q"
        type="search"
        class="search-input"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :title="cmsLabel('search_label')"
        :aria-label="cmsLabel('search_label')"
        :placeholder="cmsLabel('search_input_placeholder')"
        max-length="100"
        v-model="searchInputValue"
        @input="onChange"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        ref="searchInputEl"
      />
    </form>
    <transition name="fade">
      <button
        v-if="searchInputValue"
        class="search-button search-button-clear"
        aria-label="Clear Search"
        @click="resetSearch"
      >
        <base-icon icon="close" class="search-icon close-icon" />
      </button>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BaseIcon from '../base/BaseIcon';

export default {
  name: 'SearchInput',
  components: {BaseIcon},
  props: {
    searchId: String,
    searchValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchInputValue: '',
      searchRequestDelay: 300,
      minTypeaheadLength: 2,
      inputFocused: false,
    };
  },
  computed: {
    ...mapGetters({
      navActive: 'navigation/navActive',
      searchQuery: 'search/searchQuery',
    }),
    searchInputRef() {
      return this.$refs.searchInputEl;
    },
  },
  methods: {
    onChange() {
      let currentQuery = this.searchInputValue;
      setTimeout(() => {
        if (
          currentQuery === this.searchInputValue.trim() &&
          this.searchInputValue.length > this.minTypeaheadLength
        ) {
          this.performSearch();
        } else if (this.searchInputValue.length === 0) {
          this.$store.dispatch('search/setSearchQuery', null);
        }
      }, this.searchRequestDelay);
    },
    submitSearch() {
      this.performSearch();
      this.blurSearchInput();
    },
    performSearch() {
      if (this.searchInputValue) {
        this.$store.dispatch('search/setSearchQuery', this.searchInputValue);
      }
    },
    resetSearch() {
      this.searchInputValue = '';
      this.$store.dispatch('search/setSearchQuery', null);
      this.focusSearchInput();
    },
    focusSearchInput() {
      if (this.searchInputRef) {
        this.searchInputRef.focus();
      }
    },
    blurSearchInput() {
      if (this.searchInputRef) {
        this.searchInputRef.blur();
      }
    },
  },
  watch: {
    searchValue: {
      immediate: true,
      handler: function (newVal) {
        this.searchInputValue = newVal;
      },
    },
    navActive: {
      immediate: true,
      handler: function (newVal) {
        if (!newVal) {
          //Allow search results to fade out before clearing value
          setTimeout(() => {
            this.searchInputValue = '';
          }, 500);
          this.searchInputValue = '';
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
$search-icon-width: $spacing-300;

.search-input-container {
  width: 100%;
}

.search-input-container {
  width: 100%;
  position: relative;
  display: flex;

  /deep/ {
    .btn {
      border: 0;
    }
  }
}

.search-input-form {
  width: 100%;

  .input-focused & {
    background-color: $color-gray-100;
  }
}

.search-button {
  position: absolute;
  top: 0;
  width: $search-icon-width;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  &-submit {
    left: 0;
  }

  &-clear {
    right: 0;
  }

  @media (min-width: $navigation-breakpoint) {
    &-submit {
      left: auto;
      right: $spacing-50;
    }

    &-clear {
      display: none;
    }
  }
}

.search-icon {
  width: $spacing-150;
  height: $spacing-150;
  fill: $color-gray-600;

  @media (min-width: $navigation-breakpoint) {
    width: $spacing-200;
    height: $spacing-200;
  }
}

.close-icon {
  width: 0.875rem;
  height: 0.875rem;
}

input.search-input {
  width: 100%;
  height: $spacing-300;
  padding: $spacing-112 $spacing-325;
  border: none;
  border-radius: 2px;
  font-size: $font-size-100;
  outline: none;
  background: $color-gray-100;

  &:focus {
    background-color: $color-gray-100;
  }

  &::placeholder {
    color: $color-gray-400;
  }

  @media (min-width: $navigation-breakpoint) {
    height: $spacing-475;
    padding: $spacing-100 $spacing-450 $spacing-100 $spacing-200;
    font-size: $spacing-150;
    line-height: 1.75;
  }
}
</style>
