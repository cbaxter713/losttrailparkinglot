<template>
  <stacked-component class="faqs" spacing>
    <layout-container text-block>
      <base-tout v-if="title || subtitle" class="faq-tout" :title="title" :copy="subtitle" />
      <accordion-group :accordion-content="faqs"></accordion-group>
    </layout-container>
  </stacked-component>
</template>

<script>
import AccordionGroup from './AccordionGroup';
import StackedComponent from '../layout/StackedComponent';
import LayoutContainer from '../layout/LayoutContainer';
import BaseTout from '../base/BaseTout';
export default {
  name: 'Faq',
  components: {BaseTout, LayoutContainer, StackedComponent, AccordionGroup},
  props: {
    /**
     * An array of FAQs. Each FAQ object has a 'name', 'header', and 'content' property as found in the AccordionGroup component
     */
    faqs: {
      type: Array,
      required: true
    },
    /**
     * Text to display as title above the FAQ
     */
    title: String,
    /**
     * Text to display as subtitle below the title
     */
    subtitle: String
  }
};
</script>

<style lang="scss" scoped>
.faqs /deep/ {
  .accordion-content-inner > div {
    & > * {
      display: inline;
    }
  }
}

.faq-tout {
  margin-bottom: $spacing-200;
}
</style>

<docs>
  ### Examples

  #### Default example with title and subtitle
  ```jsx
  const faqs = [
    {
      name: 'FAQ Accordion 1',
      header: 'What is the difference between Carbon Series and TURQ?',
      content: 'TURQ Series bikes are manufactured with the highest quality and best-performing carbon fiber available and offer the perfect balance of stiffness, durability, and compliance. The result is a bike that feels smooth, solid and aggressive. Carbon series bikes use a modified carbon fiber layup of our TURQ Series bikes. By using different materials and tweaking the fiber layup, we are able to make a more aggressively priced carbon high-performance mountain bike while maintaining the strength and stiffness of its higher end sibling. The carbon series SB130 weighs a bit more, about 220g for a frame.'
    },
    {
      name: 'FAQ Accordion 2',
      header: 'WHAT IS SWITCH INFINITY TECHNOLOGY AND HOW DOES IT WORK?',
      content: 'TURQ Series bikes are manufactured with the highest quality and best-performing carbon fiber available and offer the perfect balance of stiffness, durability, and compliance. The result is a bike that feels smooth, solid and aggressive. Carbon series bikes use a modified carbon fiber layup of our TURQ Series bikes. By using different materials and tweaking the fiber layup, we are able to make a more aggressively priced carbon high-performance mountain bike while maintaining the strength and stiffness of its higher end sibling. The carbon series SB130 weighs a bit more, about 220g for a frame.'
    },
    {
      name: 'FAQ Accordion 3',
      header: 'DOES THE SWITCH INFINITY SYSTEM REQUIRE MAINTENANCE?',
      content: 'TURQ Series bikes are manufactured with the highest quality and best-performing carbon fiber available and offer the perfect balance of stiffness, durability, and compliance. The result is a bike that feels smooth, solid and aggressive. Carbon series bikes use a modified carbon fiber layup of our TURQ Series bikes. By using different materials and tweaking the fiber layup, we are able to make a more aggressively priced carbon high-performance mountain bike while maintaining the strength and stiffness of its higher end sibling. The carbon series SB130 weighs a bit more, about 220g for a frame.'
    }
  ];

  <faq :faqs="faqs" title="Demo FAQs" subtitle="These are some sample questions to look through"></faq>
  ```
</docs>
