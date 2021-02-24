<template>
  <div class="plus-to-minus">
    <span :class="[`size-${size}`, {active: active}]" aria-hidden="true"></span>
  </div>
</template>

<script>
export default {
  name: 'BasePlusToMinus',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: (value) => {
        return ['100', '150', '200'].includes(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.plus-to-minus {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: $font-size-100;

  span {
    &.size-150 {
      font-size: $font-size-150;
    }

    &.size-200 {
      font-size: $font-size-200;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 2px);
      left: 50%;
      display: block;
      width: 1em;
      height: 2px;
      background-color: $color-black;
      transition: transform $transition-base;
    }

    &::before {
      transform: translateX(-50%);
    }

    &::after {
      transform: translateX(-50%) rotate(90deg);
    }

    &.active {
      &::before,
      &::after {
        transform: translateX(-50%) rotate(180deg);
      }
    }
  }
}
</style>

<docs>
### Examples

#### Default State
```jsx
<base-plus-to-minus />
```

#### Active State
```jsx
<base-plus-to-minus :active="true" />
```

#### Interactive Example
```jsx
const isActive = false;
<button @click="isActive = !isActive">Toggle</button>
<base-plus-to-minus :active="isActive" />
```
</docs>
