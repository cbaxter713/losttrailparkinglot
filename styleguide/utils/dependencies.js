import Vue from 'vue';

import IconDefinitions from '../../components/utility/IconDefinitions';
Vue.component('icon-definitions', IconDefinitions);

import VueSlickCarousel from 'vue-slick-carousel';
Vue.component('VueSlickCarousel', VueSlickCarousel);

Vue.mixin({
  methods: {
    // Allows nuxt-i18n localePath method to not cause errors in styleguide
    localePath(link) {
      return link;
    },
    replaceTag(value, tag, newTag) {
      return value.replace(`<${tag}>`, `<${newTag}>`).replace(`</${tag}>`, `</${newTag}>`);
    }
  }
});
