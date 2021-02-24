<template>
  <section>
    <h3>Colors</h3>

    <div class="sg-color-container">
      <div v-for="(item, index) in colors" :key="index" class="sg-color-item">
        <div class="sg-color-block" :class="`bg-${item.name}`"></div>
        <p class="sg-color-caption">${{ item.name }} ({{ item.hex }})</p>
      </div>
    </div>

    <h3>Gray Scale</h3>

    <div class="sg-color-container">
      <div v-for="(item, index) in grays" :key="index" class="sg-color-item">
        <div class="sg-color-block" :class="`bg-${item.name}`"></div>
        <p class="sg-color-caption">${{ item.name }} ({{ item.hex }})</p>
      </div>
    </div>

    <h3>Warning</h3>

    <div class="sg-color-container">
      <div v-for="(item, index) in warnings" :key="index" class="sg-color-item">
        <div class="sg-color-block" :class="`bg-${item.name}`"></div>
        <p class="sg-color-caption">${{ item.name }} ({{ item.hex }})</p>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Color Palette of the site.
 */

export default {
  name: 'Colors',
  computed: {
    colors() {
      return [
        {
          name: 'color-primary',
          hex: '#62bb46',
        },
        {
          name: 'color-primary-dark',
          hex: '#228801',
        },
        {
          name: 'color-primary-light',
          hex: '#30a80b',
        },
        {
          name: 'color-error',
          hex: '#bc2900',
        },
        {
          name: 'color-error-negative',
          hex: '#ff3800',
        },
      ];
    },
    grays() {
      return [
        {
          name: 'color-gray-1000',
          hex: '#000104',
        },
        {
          name: 'color-gray-900',
          hex: '#0f0f10',
        },
        {
          name: 'color-gray-800',
          hex: '#1e1f22',
        },
        {
          name: 'color-gray-700',
          hex: '#3e3e41',
        },
        {
          name: 'color-gray-600',
          hex: '#5c5d5f',
        },
        {
          name: 'color-gray-500',
          hex: '#747576',
        },
        {
          name: 'color-gray-400',
          hex: '#999a9b',
        },
        {
          name: 'color-gray-300',
          hex: '#b8b8b9',
        },
        {
          name: 'color-gray-200',
          hex: '#d7d7d7',
        },
        {
          name: 'color-gray-100',
          hex: '#f5f5f5',
        },
      ];
    },
    warnings() {
      return [
        {
          name: 'color-warning',
          hex: '#bc2900',
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.sg-color-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.sg-color-item {
  width: calc(33.333% - 2px);
  margin-bottom: 3rem;
  text-align: center;
}

.sg-color-block {
  height: 100px;
}

.sg-color-caption {
  margin-top: $spacing-50;
  font-size: $font-size-75;
}

.color-primary {
  color: $color-primary;
}

.bg-color-primary {
  border: 1px solid $color-primary;
  background-color: $color-primary;
}

.color-primary-light {
  color: $color-primary-light;
}

.bg-color-primary-light {
  border: 1px solid $color-primary-light;
  background-color: $color-primary-light;
}

.color-primary-dark {
  color: $color-primary-dark;
}

.bg-color-primary-dark {
  border: 1px solid $color-primary-dark;
  background-color: $color-primary-dark;
}

.color-error {
  color: $color-error;
}

.bg-color-error {
  border: 1px solid $color-error;
  background-color: $color-error;
}

.color-error-negative {
  color: $color-error-negative;
}

.bg-color-error-negative {
  border: 1px solid $color-error-negative;
  background-color: $color-error-negative;
}

.color-gray-1000 {
  color: $color-gray-1000;
}

.bg-color-gray-1000 {
  border: 1px solid $color-gray-1000;
  background-color: $color-gray-900;
}

.color-gray-900 {
  color: $color-gray-900;
}

.bg-color-gray-900 {
  border: 1px solid $color-gray-900;
  background-color: $color-gray-900;
}

.color-gray-800 {
  color: $color-gray-800;
}

.bg-color-gray-800 {
  border: 1px solid $color-gray-800;
  background-color: $color-gray-800;
}

.color-gray-700 {
  color: $color-gray-700;
}

.bg-color-gray-700 {
  border: 1px solid $color-gray-700;
  background-color: $color-gray-700;
}

.color-gray-600 {
  color: $color-gray-600;
}

.bg-color-gray-600 {
  border: 1px solid $color-gray-600;
  background-color: $color-gray-600;
}

.color-gray-500 {
  color: $color-gray-500;
}

.bg-color-gray-500 {
  border: 1px solid $color-gray-500;
  background-color: $color-gray-500;
}

.color-gray-400 {
  color: $color-gray-400;
}

.bg-color-gray-400 {
  border: 1px solid $color-gray-400;
  background-color: $color-gray-400;
}

.color-gray-300 {
  color: $color-gray-300;
}

.bg-color-gray-300 {
  border: 1px solid $color-gray-300;
  background-color: $color-gray-300;
}

.color-gray-200 {
  color: $color-gray-200;
}

.bg-color-gray-200 {
  border: 1px solid $color-gray-200;
  background-color: $color-gray-200;
}

.color-gray-100 {
  color: $color-gray-400;
}

.bg-color-gray-100 {
  border: 1px solid $color-gray-200;
  background-color: $color-gray-100;
}

.color-warning {
  color: $color-warning;
}

.bg-color-warning {
  border: 1px solid $color-warning;
  background-color: $color-warning;
}
</style>

<docs>
  ```jsx
  <Colors></Colors>
  ```
</docs>
