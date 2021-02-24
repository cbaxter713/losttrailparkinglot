<template>
  <section class="sg-typography-container">
    <theme v-for="(theme, index) in themes" :key="index" :theme="theme">
      <h3>{{ theme }} Theme</h3>

      <div class="type-group">
        <div class="type-label">Display 1</div>
        <h1 class="display-1">{{ text.string.short }}</h1>
        <div class="type-label">Display 2</div>
        <h2 class="display-2">{{ text.string.short }}</h2>
        <div class="type-label">Display 3</div>
        <h3 class="display-3">{{ text.string.short }}</h3>
      </div>

      <div class="type-group">
        <div class="type-label">H1</div>
        <h1>{{ text.string.short }}</h1>
        <div class="type-label">H2</div>
        <h2>{{ text.string.short }}</h2>
        <div class="type-label">H3</div>
        <h3>{{ text.string.short }}</h3>
        <div class="type-label">H4</div>
        <h4>{{ text.string.short }}</h4>
        <div class="type-label">H5</div>
        <h5>{{ text.string.short }}</h5>
        <div class="type-label">H6</div>
        <h6>{{ text.string.short }}</h6>
      </div>

      <div class="type-group">
        <div class="type-label">Subheading 200</div>
        <h3 class="subheading-200">{{ text.string.short }}</h3>
        <div class="type-label">Subheading Gray</div>
        <h1 class="subheading-200 subheading-gray">{{ text.string.short }}</h1>
        <div class="type-label">Subheading 150</div>
        <h2 class="subheading-150">{{ text.string.short }}</h2>
        <div class="type-label">Subheading 100</div>
        <h1 class="subheading-100">{{ text.string.short }}</h1>
      </div>

      <div class="type-group">
        <div class="type-label">Paragraph small</div>
        <p class="small">{{ text.string.long }}</p>

        <div class="type-label">Paragraph</div>
        <p>{{ text.string.long }}</p>

        <div class="type-label">Paragraph Large</div>
        <p class="large">{{ text.string.long }}</p>
      </div>

      <div class="type-group">
        <div class="type-label">Standalone text link</div>
        <div><a href="#">Standalone Text Link</a></div>

        <div class="type-label">Paragraph with inline link</div>
        <p>This is some paragraph copy with an <a href="#">Inline Text Link</a></p>

        <div class="type-label">Blockquote</div>
        <blockquote>{{ text.string.short }}</blockquote>
      </div>
    </theme>
  </section>
</template>

<script>
import Theme from '../../components/patterns/Theme';

export default {
  components: {Theme},
  name: 'Typography',
  computed: {
    themes() {
      return ['light', 'dark'];
    },
  },
};
</script>

<style scoped lang="scss">
.sg-typography-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.theme {
  width: 50%;
  padding: $spacing-300 $spacing-200;
}

.type-group {
  margin-bottom: $spacing-300;
  padding-bottom: $spacing-300;
  border-bottom: 2px solid $color-gray-400;

  .theme-dark & {
    border-bottom: 2px solid $color-gray-100;
  }
}

.type-label {
  padding-top: $spacing-300;
  color: $color-gray-400;
  font-weight: $font-weight-bold;
  text-transform: uppercase;

  .theme-dark & {
    color: $color-gray-100;
  }
}
</style>

<docs>
  ```jsx
  <typography></typography>
  ```
</docs>
