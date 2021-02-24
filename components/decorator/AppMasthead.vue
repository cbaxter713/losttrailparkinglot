<template>
  <header class="app-masthead">
    <layout-container class="masthead-inner">
      <button class="menu-toggle">MENU</button>
      <button class="tuner-toggle">TUNES</button>
    </layout-container>
  </header>
</template>

<script>
import LayoutContainer from '@/components/layout/LayoutContainer';
export default {
  name: 'AppMasthead',
  components: {LayoutContainer},
};
</script>

<style scoped lang="scss">
.app-masthead {
  height: $header-height;
  display: flex;
  align-items: center;
}

.masthead-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.menu-toggle,
.tuner-toggle {
  color: $color-white;
}
</style>
