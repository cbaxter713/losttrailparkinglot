<template>
  <stacked-component :id="id" class="anchor-location" :no-effect="hasNoEffect"></stacked-component>
</template>

<script>
import StackedComponent from '../layout/StackedComponent';
/**
 * Just a div with an ID, as a place to anchor link to.
 */
export default {
  name: 'AnchorLocation',
  components: {StackedComponent},
  props: {
    id: String,
    index: Number
  },
  computed: {
    hasNoEffect() {
      return this.index !== 0;
    }
  }
};
</script>

<style scoped lang="scss"></style>
