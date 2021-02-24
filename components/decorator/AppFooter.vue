<template>
  <footer class="app-footer">
    <layout-container>
      <theme theme="dark" class="app-container">
        <div class="footer-credits">
          <p>
            Concepts & Development by
            <a href="https://github.com/orgs/backDeckLabs/dashboard" target="_blank">
              @backDeckLabs
            </a>
          </p>
          <h5>Fueled by all of us</h5>
        </div>
        <div class="footer-main-content"></div>
        <div class="footer-legal"></div>
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
