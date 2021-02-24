<template>
  <div :id="appWrapperId" class="app-wrapper" :class="{'nav-active': navActive}" tabindex="-1">
    <client-only>
      <vue-announcer />
    </client-only>
    <a
      :href="`#${mainContentId}`"
      class="skip-link"
      id="skipLink"
      :aria-hidden="navActive ? 'true' : 'false'"
    >
      Skip to Main Content
    </a>
    <app-masthead class="app-masthead" />
    <app-navigation class="app-navigation" />
    <main :id="mainContentId" class="app-main" :aria-hidden="stringBoolean(navActive)">
      <nuxt />
    </main>
    <app-footer class="app-footer" />
    <portal-target name="modalPortal" multiple />
    <icon-definitions />
  </div>
</template>

<script>
import {debounce} from 'lodash';
import {mapGetters} from 'vuex';
import {breakpointArray} from '../plugins/mediaQueries';
import AppFooter from '../components/decorator/AppFooter.vue';
import IconDefinitions from '../components/utility/IconDefinitions';
import AppNavigation from '@/components/decorator/AppNavigation';
import AppMasthead from '@/components/decorator/AppMasthead';

export default {
  name: 'BaseLayout',
  components: {
    AppMasthead,
    AppNavigation,
    IconDefinitions,
    AppFooter,
  },
  head() {
    return {
      meta: this.globalMetaFields,
      script: this.globalScripts,
    };
  },
  data() {
    return {
      mainContentId: 'mainContent',
    };
  },
  computed: {
    ...mapGetters({
      appWrapperId: 'appId',
      settings: 'settings',
      navActive: 'navigation/navActive',
      trackingEnabled: 'trackingEnabled',
    }),
    globalMetaFields() {
      const metaFields = [];

      if (
        this.settings.google_site_verification_ids &&
        this.settings.google_site_verification_ids.length
      ) {
        const cleanGoogleVerificationArray = this.settings.google_site_verification_ids.filter(
          (item) => item.verification_id
        );
        cleanGoogleVerificationArray.forEach((item) => {
          metaFields.push({name: `google-site-verification`, content: item.verification_id});
        });
      }
      return metaFields;
    },
    globalScripts() {
      const scripts = [];
      return scripts;
    },
    debouncedPageDimensionAudit() {
      return debounce(this.auditPageDimensions, 200);
    },
  },
  methods: {
    getIsMobile() {
      this.$store.dispatch(
        'setIsMobile',
        breakpointArray.indexOf(this.$mq) <= breakpointArray.indexOf('nav')
      );
    },
    getIsVertical() {
      this.$store.dispatch('setIsVertical', window.innerWidth < window.innerHeight);
    },
    auditPageDimensions() {
      this.getIsMobile();
      this.getIsVertical();
    },
  },
  watch: {
    navActive(newValue) {
      this.$store.dispatch('setBodyScrollLock', newValue);
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.debouncedPageDimensionAudit);

    // Setup dataLayer
    window.dataLayer = window.dataLayer || [];

    // Init GTM
    if (this.trackingEnabled) {
      this.$store.dispatch('initGTM');
    }

    //Register service worker globally
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  },
  mounted() {
    this.auditPageDimensions();
  },
  destroyed() {
    window.removeEventListener('resize', this.debouncedPageDimensionAudit);
  },
};
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
}

.skip-link {
  position: absolute;
  top: auto;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  transition: all 0.2s ease-out;
  background: $color-black;
  color: $color-white;

  &:focus {
    z-index: $skip-link-z-index;
    right: 0;
    left: auto;
    width: auto;
    height: auto;
    padding: $spacing-25 $spacing-50;
    background: $color-black;

    @media (min-width: $screen-sm) {
      left: 0;
      right: auto;
    }
  }
}

.app-masthead {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $header-z-index;
}

main {
  position: relative;
  width: 100%;
  z-index: $main-page-z-index;

  &::before {
    content: '';
    position: absolute;
    z-index: $page-top-gradient-z-index;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background-image: linear-gradient(
      to bottom,
      rgba($color-black, 0.35) 1%,
      rgba($color-black, 0)
    );

    @media (min-width: $navigation-breakpoint) {
      height: 135px;
    }
  }
}

.app-footer {
  position: relative;
  z-index: $z-index-level-footer;
}
</style>
