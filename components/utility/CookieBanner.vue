<template>
  <div v-if="show" class="cookie-banner" :class="{show: slideInOut}">
    <layout-container :gutter-large="true" class="content-wrapper">
      <div class="message-wrapper">
        <p>{{ cmsLabel('cookie_banner_message') }}</p>
      </div>
      <div class="checkbox-button-wrapper">
        <div class="button-wrapper" :class="{'space-between': locale === 'EU'}">
          <base-button
            v-if="locale === 'EU'"
            size="75"
            theme="clear"
            class="allow-btn cookie-banner-btn"
            @click.native="setCookie"
          >
            {{ cmsLabel('cookie_allow_label') }}
          </base-button>
          <base-button
            size="75"
            theme="negative"
            class="accept-btn cookie-banner-btn"
            @click.native="acceptAllCookies"
          >
            {{ cmsLabel('cookie_accept_all_label') }}
          </base-button>
        </div>
        <div v-if="locale === 'EU'" class="checkbox-wrapper">
          <div v-for="(cookie, index) in cookieTypes" :key="`cookie-${index}`">
            <base-checkbox
              v-if="cookie.cookie_checkbox_type === 'necessary'"
              :id="cookie.cookie_checkbox_type"
              :name="cookie.cookie_checkbox_type"
              :label="cookie.cookie_checkbox_label"
              :value="cookie.cookie_checkbox_type"
              :selected="true"
              :readonly="true"
            ></base-checkbox>
            <base-checkbox
              v-else
              :id="cookie.cookie_checkbox_type"
              :name="cookie.cookie_checkbox_type"
              :label="cookie.cookie_checkbox_label"
              :value="cookie.cookie_checkbox_type"
              :selected="getCookie() && getCookie()[cookie.cookie_checkbox_type]"
              @changeEvent="enableDisableCookie($event, cookie.cookie_checkbox_type)"
            ></base-checkbox>
          </div>
        </div>
      </div>
    </layout-container>
  </div>
</template>

<script>
import LayoutContainer from '../layout/LayoutContainer';
import BaseButton from '../base/BaseButton';
import BaseCheckbox from '../base/BaseCheckbox';
import {mapGetters} from 'vuex';

export default {
  name: 'CookieBanner',
  components: {BaseCheckbox, BaseButton, LayoutContainer},
  data() {
    return {
      show: false,
      slideInOut: false,
      cookieName: 'zrUserAcceptedCookie',
      allCookies: false,
      necessary: true, // Strictly necessary cookies - https://gdpr.eu/cookies/#:~:text=Cookies%20that%20allow%20web%20shops,example%20of%20strictly%20necessary%20cookies.&text=This%20includes%20cookies%20from%20third,owner%20of%20the%20website%20visited.
      preferences: false,
      statistics: false,
      marketing: false,
    };
  },
  computed: {
    ...mapGetters({
      showCookieBanner: 'showCookieBanner',
    }),
    cookieTypes() {
      return this.cmsLabel('cookies');
    },
    locale() {
      return this.$localeService.store();
    },
  },
  methods: {
    enableDisableCookie(event, type) {
      this[type] = event.target.checked;
    },
    acceptAllCookies() {
      this.allCookies = true;

      // for eu locale
      this.necessary = true;
      this.preferences = true;
      this.statistics = true;
      this.marketing = true;

      this.setCookie();
    },
    acceptCookies() {
      this.setCookie();
    },
    getCookie() {
      return this.$cookies.get(this.cookieName);
    },
    setCookie() {
      const cookieValue = {
        all:
          this.allCookies ||
          (this.necessary && this.preferences && this.statistics && this.marketing), // for when user manually checks boxes 'EU'
        necessary: this.necessary,
        preferences: this.preferences,
        statistics: this.statistics,
        marketing: this.marketing,
      };

      // Persistent cookies - we will notify the user again in a year
      // https://gdpr.eu/cookies/#:~:text=Cookies%20that%20allow%20web%20shops,example%20of%20strictly%20necessary%20cookies.&text=This%20includes%20cookies%20from%20third,owner%20of%20the%20website%20visited.
      const expires = 60 * 60 * 24 * 365;
      const domain =
        document.location.hostname.includes('localhost') ||
        document.location.hostname.includes('appspot') ||
        document.location.hostname.includes('zaneray')
          ? document.location.hostname
          : document.location.hostname.replace('www.', '.');

      const secure = domain.includes('localhost') ? false : true;
      const sameSite = domain.includes('localhost') ? 'Lax' : 'None';

      const options = {
        path: '/',
        maxAge: expires,
        domain: domain,
        secure: secure,
        sameSite: sameSite,
      };

      this.$cookies.set(this.cookieName, cookieValue, options);
      this.updateWindow(cookieValue);

      this.slideInOut = false;
      setTimeout(() => {
        this.show = false;
        this.$store.dispatch('showCookieBanner', false);
      }, 1000);
    },
    userAcceptedCookies() {
      return process.client ? this.getCookie() : undefined;
    },
    updateWindow(cookieValue) {
      try {
        window.siteGaData.userData.cookiesAccepted = cookieValue;
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.show = this.userAcceptedCookies() === undefined;
    if (this.show) {
      setTimeout(() => {
        this.slideInOut = true;
      }, 1000);
    }
  },
  watch: {
    showCookieBanner(newValue) {
      if (newValue) {
        this.show = true;
        setTimeout(() => {
          this.slideInOut = true;
        }, 500);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$cookie-banner-breakpoint: $navigation-breakpoint;

.cookie-banner {
  position: fixed;
  z-index: $cookie-banner-z-index;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: $spacing-200 0 $spacing-100 0;
  transform: translateY(100%);
  transition: transform 0.5s ease-in-out;
  background-color: rgba($color-gray-1000, 0.9);
  color: $color-white;

  @media (min-width: $cookie-banner-breakpoint) {
    padding: $spacing-300 0 $spacing-200 0;
  }

  &.show {
    transform: translateY(0%);
  }
}

p {
  color: $color-white;
}

.content-wrapper {
  flex-direction: column;

  &.container:not(.disabled) {
    padding: 0 $spacing-150;

    @media (min-width: $cookie-banner-breakpoint) {
      align-items: center;
      justify-content: space-between;
      padding: 0 $spacing-300;
    }
  }

  @media (min-width: $cookie-banner-breakpoint) {
    flex-direction: row;
  }

  p {
    font-size: $font-size-50;
  }
}

.content-wrapper,
.button-wrapper,
.checkbox-wrapper {
  display: flex;
}

.button-wrapper {
  flex-direction: column;
  align-items: center;

  @media (min-width: $cookie-banner-breakpoint) {
    flex-direction: row;
    justify-content: flex-end;
  }

  .cookie-banner-btn {
    color: $base-type-color;
  }

  .allow-btn {
    order: 2;
    margin-right: 0;
    width: 100%;
    font-size: $font-size-75;
    text-transform: uppercase;

    @media (min-width: $cookie-banner-breakpoint) {
      order: 1;
      width: initial;
      margin-right: $spacing-150;
    }
  }

  .accept-btn {
    order: 1;
    width: 100%;
    margin-bottom: $spacing-100;

    @media (min-width: $cookie-banner-breakpoint) {
      order: 2;
      width: initial;
      margin-bottom: 0;
    }
  }

  &.space-between {
    margin-bottom: $spacing-150;

    @media (min-width: $cookie-banner-breakpoint) {
      justify-content: space-between;
    }
  }
}

.message-wrapper {
  margin-bottom: $spacing-150;

  @media (min-width: $cookie-banner-breakpoint) {
    width: 55%;
    margin-right: $spacing-600;
    margin-bottom: 0;
  }
}

.checkbox-button-wrapper {
  @media (min-width: $cookie-banner-breakpoint) {
    width: calc(45% - 6rem);
  }
}

.checkbox-wrapper {
  flex-wrap: wrap;

  /deep/ .base-checkbox {
    margin-right: $spacing-150;
    margin-bottom: $spacing-150;

    label {
      font-size: $font-size-50;

      &::before {
        top: $spacing-50;
      }
    }
  }
}
</style>
