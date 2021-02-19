import Vue from 'vue';
import {routes} from '@/utils/routeMapping';

if (!Vue.__global_mixin__) {
  Vue.__global_mixin__ = true;
  Vue.mixin({
    data() {
      return {
        htmlTagPattern: /<\/?[^>]+(>|$)/g
      };
    },
    computed: {
      routes() {
        return routes;
      }
    },
    methods: {
      pluralize(value, text) {
        return value !== 1 ? `${text}s` : text;
      },
      cmsLinkToUrl(linkObj) {
        if (linkObj) {
          return linkObj.link_type && (linkObj.url || linkObj.slug)
            ? this.$prismic.dom.Link.url(linkObj, this.$prismic.linkResolver)
            : this.$prismic.linkResolver(linkObj);
        }
        return '/';
      },
      cmsLinkToTarget(linkObj) {
        if (linkObj) {
          return linkObj.target || '_self';
        }
        return '_self';
      },
      isCmsLinkExternal(linkObj) {
        if (linkObj) {
          return linkObj.link_type === 'Media' || linkObj.link_type === 'Web';
        }
        return false;
      },
      cmsLinkToLinkType(linkObj) {
        return {
          url: this.cmsLinkToUrl(linkObj),
          external: this.isCmsLinkExternal(linkObj),
          target: this.cmsLinkToTarget(linkObj)
        };
      },
      cmsLinkExists(linkObj) {
        return linkObj && (linkObj.url !== undefined || linkObj.slug !== undefined);
      },
      stripHtmlFromString(htmlString) {
        return htmlString.replace(this.htmlTagPattern, '');
      },
      removeTag(value, tag) {
        return value.replace(`<${tag}>`, '').replace(`</${tag}>`, '');
      },
      replaceTag(value, tag, newTag) {
        return value.replace(`<${tag}>`, `<${newTag}>`).replace(`</${tag}>`, `</${newTag}>`);
      },
      refElement(ref) {
        return ref.$el || ref;
      },
      safeAltText(altText) {
        return altText || '';
      },
      stringBoolean(value) {
        return value ? 'true' : 'false';
      },
      isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
      },
      removeEmptyObjectsFromArray(arr) {
        return arr.filter((item) => !this.isObjectEmpty(item));
      },
    },
    filters: {
      reverse(items) {
        return items.slice().reverse();
      }
    }
  });
}
