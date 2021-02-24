<template>
  <footer class="app-footer">
    <layout-container>
      <theme theme="dark" class="footer-container">
        <p>Footer Goes Here</p>
      </theme>
    </layout-container>
  </footer>
</template>

<script>
import LayoutContainer from '@/components/layout/LayoutContainer';
import Theme from '@/components/patterns/Theme';
export default {
  name: 'AppFooter',
  components: {Theme, LayoutContainer},
};
</script>

<style scoped lang="scss">
.app-footer {
  padding: $spacing-400 0;
  background-color: $color-gray-800;
}

.footer-credits {
  text-align: center;
}
</style>
