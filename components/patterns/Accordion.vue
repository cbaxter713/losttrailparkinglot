<template>
  <div class="base-accordion">
    <client-only>
      <zr-accordion v-bind="$props" @toggle="accordionToggled($event)"><slot></slot></zr-accordion>
    </client-only>
  </div>
</template>

<script>
import {ZrAccordion} from '@zaneray/vue-components';

export default {
  name: 'Accordion',
  components: {ZrAccordion},
  extends: ZrAccordion,
  methods: {
    accordionToggled(event) {
      this.$emit('toggle', event);
    }
  }
};
</script>

<style scoped lang="scss">
@include zr-accordion-styles;
</style>

<docs>
### Examples

#### Basic Accordion
```jsx
<accordion name="Accordion1" header="Example According Header">
  <h4>Example Accordion Content</h4>
  <p>More content here.  Markup is rendered</p>
</accordion>
```
</docs>
