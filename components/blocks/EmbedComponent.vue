<template>
  <stacked-component class="embed-component" :spacing="spacing">
    <layout-container :disabled="!inContainer" :text-block="textBlockWidth">
      <div class="embed-container" v-html="html"></div>
    </layout-container>
  </stacked-component>
</template>

<script>
import LayoutContainer from '../layout/LayoutContainer';
import StackedComponent from '../layout/StackedComponent';

/**
 * A plain embed component to embed some script/elements within the page.
 * Typically used for Podcasts, forms, survey, etc.
 */

export default {
  name: 'EmbedComponent',
  components: {
    StackedComponent,
    LayoutContainer
  },
  props: {
    /**
     * Copy to rendered inside column
     */
    html: {
      type: String,
      required: true
    },
    spacing: {
      type: Boolean,
      default: true
    },
    inContainer: {
      type: Boolean,
      default: true
    },
    textBlockWidth: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.embed-container {
  /deep/ > * {
    width: 100%;
  }
}
</style>

<docs>
  ### Examples

  #### Plain HTML
  ```jsx
  const html = `<div><h1>Any HTML you want</h1><h2>Can Go here</h2></div>`;

  <embed-component :html="html"></embed-component>
  ```

  #### Iframe
  ```jsx
  const html = `<iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>`;

  <embed-component :html="html"></embed-component>
  ```
</docs>
