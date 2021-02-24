<template>
  <client-only>
    <zr-accordion-group
      v-bind="$props"
      class="base-accordion"
      :class="{header}"
    ></zr-accordion-group>
  </client-only>
</template>

<script>
import {ZrAccordionGroup} from '@zaneray/vue-components';

/**
 * Accordion component for displaying groups of header/content pairs.  This leverages the ZrAccordionGroup component
 * documented at https://zr-vue.netlify.com/#/Patterns/ZrAccordion
 */

export default {
  name: 'AccordionGroup',
  components: {
    ZrAccordionGroup
  },
  extends: ZrAccordionGroup,
  props: {
    header: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
@include zr-accordion-styles;
</style>

<docs>
  ### Examples

  #### Default Accordion Group
  ```jsx
  const content = [
    {
      name: 'test1',
      header: 'First Accordion',
      content: `<h2>Header 2</h2><p>And a paragraph</p>`
    },
    {
      name: 'test2',
      header: 'Second Accordion',
      content: 'Just a string'
    }
  ]

  <accordion-group :accordion-content="content"></accordion-group>
  ```

  #### Header Accordion Group
  ```jsx
  const content = [
  {
  name: 'test1',
  header: 'First Accordion',
  content: `<h2>Header 2</h2><p>And a paragraph</p>`
  },
  {
  name: 'test2',
  header: 'Second Accordion',
  content: 'Just a string'
  }
  ]

  <accordion-group :accordion-content="content" :header="true"></accordion-group>
  ```

</docs>
