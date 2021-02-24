<template>
  <stacked-component class="text-block" :theme="theme" :topo="topo" spacing>
    <layout-container text-block class="text-block-inner" :class="`align-${textAlignment}`">
      <h3 v-if="title" class="title">{{ title }}</h3>
      <div
        v-html="content"
        class="content"
        :class="`columns-${columns} font-size-${fontSize}`"
      ></div>
    </layout-container>
  </stacked-component>
</template>

<script>
import LayoutContainer from '../layout/LayoutContainer';
import StackedComponent from '../layout/StackedComponent';
import {themeProps} from '../../mixins/sharedProps';

/**
 * The TextBlock slice renders html
 * into one or two one or two columns.
 */

export default {
  name: 'TextBlock',
  components: {
    StackedComponent,
    LayoutContainer
  },
  mixins: [themeProps],
  props: {
    /**
     * Text to display as title above the copy of the text block
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Copy to render in the text block.  Can be text or an HTML string
     */
    content: {
      type: String,
      required: true
    },
    /**
     * Font size to display the content at
     */
    fontSize: {
      type: String,
      default: 'base',
      validator: (value) => {
        return ['base', 'large'].includes(value);
      }
    },
    /**
     * Alignment of text
     */
    textAlignment: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'center'].includes(value);
      }
    },
    /**
     * Number of columns to display the copy in at desktop
     */
    columns: {
      type: String,
      default: '1',
      validator: (value) => {
        return ['1', '2'].includes(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
$text-block-breakpoint: $screen-sm;

.text-block-inner {
  text-align: left;

  &.align-center {
    text-align: center;
  }
}

.title {
  margin: 0 0 $spacing-100 0;
  font-size: $spacing-150;

  @media (min-width: $text-block-breakpoint) {
    font-size: $spacing-200;
  }
}

.content {
  /deep/ {
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }

    p {
      margin: 0;

      & + p {
        margin-top: $spacing-100;
      }
    }

    strong {
      font-family: $font-family-headings;
      font-weight: normal;
    }

    .rich-text-figure {
      margin: $spacing-250 0;

      figcaption {
        margin-left: $spacing-100;
        font-size: $font-size-75;
        color: $color-gray-500;
      }
    }
  }

  @media (min-width: $navigation-breakpoint) {
    /deep/ {
      .rich-text-figure {
        margin: $spacing-500 0;
      }
    }
  }

  &.columns-2 {
    @media (min-width: $text-block-breakpoint) {
      column-gap: $gutter;
      column-count: 2;
    }
  }

  &.font-size-large {
    /deep/ p {
      font-size: $spacing-125;
    }
  }
}
</style>

<docs>
  ### Examples

  #### Content
  ```jsx
  <text-block :content="text.paragraph"></text-block>
  ```

  #### Content with title
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraph"></text-block>
  ```

  #### Two Columns
  ```jsx
  <text-block :content="text.paragraph" columns="2"></text-block>
  ```

  #### Gray theme
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraph" theme="gray"></text-block>
  ```

  #### Dark theme
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraph" theme="dark"></text-block>
  ```

  #### Dark theme w/ topo
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraph" theme="dark" topo></text-block>
  ```

  #### Center aligned, large font
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraph" text-alignment="center" font-size="large"></text-block>
  ```

  #### Multiple paragraphs
  ```jsx
  <text-block title="Donec vehicula fermentum scelerisque" :content="text.paragraphs"></text-block>
  ```
</docs>
