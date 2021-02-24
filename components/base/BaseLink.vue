<template>
  <a v-if="finalExternal" :href="finalLinkPath" :target="finalTarget" rel="noopener">
    <slot></slot>
  </a>
  <nuxt-link v-else :to="finalLinkPath">
    <slot></slot>
  </nuxt-link>
</template>

<script>
/**
 * A global link component used to handle internal and external linking as well as linking from a CMS link object
 */

export default {
  name: 'BaseLink',
  props: {
    /**
     * URL or path to link to
     */
    url: {
      type: String,
      default: '',
    },
    /**
     * Object that represents a link from a headless CMS.  Currently setup for Prismic
     */
    cmsLink: {
      type: Object,
      default: function () {
        return {};
      },
    },
    /**
     * Whether or not the link is external
     */
    external: {
      type: Boolean,
      default: false,
    },
    /**
     * Link target to follow for external links
     */
    target: {
      type: String,
      default: '_blank',
      validator: function (value) {
        return ['_blank', '_self'].includes(value);
      },
    },
  },
  computed: {
    hasCmsLink() {
      return this.cmsLink.url;
    },
    finalExternal() {
      return this.hasCmsLink ? this.cmsLink.external : this.external;
    },
    finalLinkPath() {
      const linkPath = this.cmsLink.url || this.url;
      // TODO: localize links here if ever needed
      // Only return localePath version if using localized content from nuxt-i18n module
      return this.finalExternal ? linkPath : linkPath;
    },
    finalTarget() {
      return this.cmsLink.target || this.target;
    },
  },
};
</script>

<style scoped lang="scss"></style>
