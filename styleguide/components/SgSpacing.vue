<template>
  <section>
    <h3>Spacing</h3>

    <section class="grid sg-spacing-grid">
      <div class="grid-item">
        <div v-for="(space, index) in spacing" :key="index" class="sg-spacing-grid-item">
          <div :class="`sg-spacing-item sg-spacing-item--${space.name}`"></div>
          <span>${{ space.name }} ({{ space.value }})</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Spacing',
  computed: {
    spacing() {
      return [
        {
          name: 'spacing-25',
          value: '0.25rem'
        },
        {
          name: 'spacing-50',
          value: '0.5rem'
        },
        {
          name: 'spacing-75',
          value: '0.75rem'
        },
        {
          name: 'spacing-100',
          value: '1rem'
        },
        {
          name: 'spacing-150',
          value: '1.5rem'
        },
        {
          name: 'spacing-200',
          value: '2rem'
        },
        {
          name: 'spacing-300',
          value: '3rem'
        },
        {
          name: 'spacing-400',
          value: '4rem'
        },
        {
          name: 'spacing-500',
          value: '5rem'
        },
        {
          name: 'spacing-600',
          value: '6rem'
        },
        {
          name: 'spacing-700',
          value: '7rem'
        },
        {
          name: 'spacing-800',
          value: '8rem'
        },
        {
          name: 'spacing-900',
          value: '9rem'
        }
      ];
    }
  }
};
</script>

<style scoped lang="scss">
.sg-spacing-grid {
  margin-top: $spacing-300;

  .grid-item {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .sg-spacing-grid-item {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-200;
  }
}

.sg-spacing-item {
  width: $spacing-200;
  height: $spacing-200;
  margin-right: $spacing-50;
  background-color: $color-primary-light;

  &--spacing-25 {
    height: $spacing-25;
  }

  &--spacing-50 {
    height: $spacing-50;
  }

  &--spacing-75 {
    height: $spacing-75;
  }

  &--spacing-100 {
    height: $spacing-100;
  }

  &--spacing-150 {
    height: $spacing-150;
  }

  &--spacing-200 {
    height: $spacing-200;
  }

  &--spacing-300 {
    height: $spacing-300;
  }

  &--spacing-400 {
    height: $spacing-400;
  }

  &--spacing-500 {
    height: $spacing-500;
  }

  &--spacing-600 {
    height: $spacing-600;
  }

  &--spacing-700 {
    height: $spacing-700;
  }

  &--spacing-800 {
    height: $spacing-800;
  }

  &--spacing-900 {
    height: $spacing-900;
  }
}
</style>

<docs>
  ```jsx
  <spacing></spacing>
  ```
</docs>
