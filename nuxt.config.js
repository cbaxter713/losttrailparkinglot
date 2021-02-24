const siteName = 'LostTrailParkingLot.com';
const desc = `At the corner of space and time.`;
const themeColor = `#000`;

const polyfillFeatures = [
  'Event',
  'EventSource',
  'HTMLPictureElement',
  'Element.prototype.classList',
  'Element.prototype.prepend',
  'IntersectionObserver',
  'IntersectionObserverEntry',
  'Symbol',
  'Symbol.iterator',
].join('%2C');

export default {
  target: 'static',

  head: {
    titleTemplate: '%s - LostTrailParkingLot.com',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'robots', content: 'all'},
      {hid: 'og:site_name', name: 'og:site_name', content: siteName},
      {hid: 'og:type', name: 'og:type', content: 'website'},
      {hid: 'description', name: 'description', content: desc},
      {name: 'msapplication-TileColor', content: themeColor},
      {name: 'msapplication-config', content: '/browserconfig.xml'},
      {name: 'theme-color', content: themeColor},
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png',
      },
      {rel: 'manifest', href: '/site.webmanifest'},
      {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg'},
      {rel: 'shortcut icon', href: '/icons/favicon.ico'},
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
    script: [
      {
        src: `https://polyfill.io/v3/polyfill.min.js?features=${polyfillFeatures}`,
        body: true,
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  loading: {color: '#fff', height: '3px'},

  /*
   ** Global CSS
   */
  css: [{src: '~assets/styles/global.scss', lang: 'scss'}],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/globalHelpersMixin',
    '~/plugins/datocms-image',
    '~plugins/mediaQueries',
    '~plugins/directives',
  ],

  router: {
    middleware: ['routeDetection'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', {icon: false, manifest: false}],
    '@nuxtjs/gtm',
    'portal-vue/nuxt',
    ['vue-scrollto/nuxt', {duration: 600, offset: 0}],
  ],

  styleResources: {
    scss: ['@/assets/styles/variables/variables.scss', '@/assets/styles/mixins/mixins.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  gtm: {
    enabled: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },
};
