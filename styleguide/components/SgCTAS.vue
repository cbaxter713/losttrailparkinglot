<template>
  <section>
    <h2>Button & Link Elements</h2>
    <div class="sg-button-container">
      <base-button full>Default</base-button>
      <base-button theme="primary" full>Primary</base-button>
      <base-button theme="primary" icon="arrow-right" full>Button w/ Icon</base-button>
      <base-button icon="arrow-right" animate-icon full>Icon w/ Hover</base-button>
      <base-cta-link>CTA Link</base-cta-link>
      <icon-definitions />
    </div>
  </section>
</template>

<script>
import BaseButton from '../../components/base/BaseButton';
import BaseCtaLink from '../../components/base/BaseCtaLink';

/**
 * Call To Action - these elements are used to draw a user's attention to a specific action,
 * typically clicking on a button, link, card or banner to navigate to a new page.
 */

export default {
  name: 'CTAS',
  components: {BaseCtaLink, BaseButton},
  data() {
    return {
      selectOptions: [
        {label: 'Pizza', value: 1},
        {label: 'Burger', value: 2},
        {label: 'Spatchcocked Turkey', value: 3},
        {label: 'Pop Tarts', value: 4}
      ]
    };
  },
  computed: {

  }
};
</script>

<style scoped lang="scss">
.sg-button-container {
  max-width: 300px;
  text-align: center;

  /deep/ {
    .base-button + .base-button,
    .base-button + .base-cta-link {
      margin-top: $spacing-200;
    }
  }
}
</style>

<docs>
```jsx
<c-t-a-s></c-t-a-s>
```
</docs>
