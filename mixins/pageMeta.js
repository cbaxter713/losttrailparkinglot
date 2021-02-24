import {mapGetters} from 'vuex';

/**
 * @mixin
 * This mixin depends on the parent component having a piece of data called "pageData" which represents
 * the Prismic data object of that page.
 */

export const pageMeta = {
  transition: {
    name: 'page',
    mode: 'out-in',
  },
  head() {
    return {
      title: this.seoTitle,
      meta: this.metaFields,
      script: this.scripts,
    };
  },
  data() {
    return {
      // Default setup of pageData object.  This should be overwritten by the pages own pageData object
      pageData: {},
      document: {},
    };
  },
  computed: {
    ...mapGetters({
      companyName: 'companyName',
      baseUrl: 'baseUrl',
    }),
    seoUrl() {
      return `${this.baseUrl}${this.$route.fullPath}`;
    },
    seoTitle() {
      if (this.pageData.meta_title) {
        return this.pageData.meta_title;
      } else if (this.pageData.title) {
        return this.$prismic.asText(this.pageData.title);
      } else if (
        this.$store.getters.settings &&
        this.$store.getters.settings.page_meta_title_fallback
      ) {
        return this.$store.getters.settings.page_meta_title_fallback;
      }

      return this.companyName;
    },
    seoDesc() {
      if (this.pageData.meta_description) {
        return this.pageData.meta_description;
      } else if (
        this.$store.getters.settings &&
        this.$store.getters.settings.page_meta_description_fallback
      ) {
        return this.$store.getters.settings.page_meta_description_fallback;
      }

      // TODO: fill in fallback site description
      return 'Site description here.';
    },
    seoImage() {
      // TODO: setup standard meta image
      // if (this.pageData.meta_image && this.pageData.meta_image.url) {
      //   return this.pageData.meta_image.url;
      // } else if (this.pageData.hero_image && this.pageData.hero_image.url) {
      //   return this.pageData.hero_image.url;
      // } else if (
      //   this.$store.getters.settings &&
      //   this.$store.getters.settings.page_meta_image_default.url
      // ) {
      //   return this.$store.getters.settings.page_meta_image_default.url;
      // }

      return false;
    },
    publicationDate() {
      if (this.document && this.document.last_publication_date) {
        return this.document.last_publication_date;
      }
    },
    metaFields() {
      const metaArray = [];

      // Always set these meta fields
      metaArray.push({hid: 'og:type', name: 'og:type', content: 'article'});
      metaArray.push({hid: 'description', name: 'description', content: this.seoDesc});
      metaArray.push({hid: 'og:description', property: 'og:description', content: this.seoDesc});
      metaArray.push({
        hid: 'twitter:description',
        name: 'twitter:description',
        value: this.seoDesc,
      });
      metaArray.push({hid: 'og:url', property: 'og:url', content: this.seoUrl});
      metaArray.push({hid: 'og:title', property: 'og:title', content: this.seoTitle});
      metaArray.push({hid: 'twitter:domain', name: 'twitter:domain', value: this.seoUrl});
      metaArray.push({hid: 'twitter:url', name: 'twitter:url', value: this.seoUrl});
      metaArray.push({hid: 'twitter:title', name: 'twitter:title', value: this.seoTitle});

      // Conditionally set these meta fields if they are populated.  Fallsback to defaults otherwise
      if (this.seoImage) {
        metaArray.push({hid: 'og:image', property: 'og:image', content: this.seoImage});
        metaArray.push({hid: 'twitter:card', name: 'twitter:card', content: this.seoImage});
        metaArray.push({hid: 'twitter:image', name: 'twitter:image', content: this.seoImage});
      }

      if (this.pageData.author_name) {
        metaArray.push({
          hid: 'article:author',
          name: 'article:author',
          content: this.pageData.author_name,
        });
      }

      if (this.publicationDate) {
        metaArray.push({
          hid: 'article:published_time',
          name: 'article:published_time',
          content: this.publicationDate,
        });
      }

      return metaArray;
    },
    productSchemaObject() {
      const productSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        brand: this.companyName,
        offers: {
          '@type': 'Offer',
          url: `${this.baseUrl}${this.$route.fullPath}`,
        },
      };

      if (this.productData.name) {
        if (this.productData.name) {
          productSchema.name = this.productData.name;
        }
        if (this.productData.defaultImage && this.productData.defaultImage.url) {
          productSchema.image = this.productData.defaultImage.url;
        }
        if (this.productData.description) {
          productSchema.description = this.stripHtmlFromString(this.productData.description);
        }
        if (this.productData.prices.price.currencyCode) {
          productSchema.offers.priceCurrency = this.productData.prices.price.currencyCode;
        }
        if (this.productData.prices.price.value) {
          productSchema.offers.price = this.productData.prices.price.value;
        }
        if (this.productData.sku) {
          productSchema.sku = this.productData.sku;
        }
      }

      // Uncomment when "MPN" is available in the product data
      // if (this.productData./*MPN*/) {
      //   productSchema.mpn = this.productData./*MPN*/;
      // }

      //Uncomment when review is available in the product data
      // if (this.productData./*review*/) {
      //   productSchema.review = this.productData./*review*/;
      // }
      return productSchema;
    },

    organizationSchemaObject() {
      const organizationSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: this.companyName,
        legalName: this.companyName,
        url: this.baseUrl,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '08:00',
            closes: '17:30',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Friday'],
            opens: '08:00',
            closes: '14:00',
          },
        ],
        logo: `${this.baseUrl}/icons/android-chrome-192x192.png`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'USA',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'General Inquires',
        },
      };

      if (this.organizationData) {
        if (this.organizationData.address) {
          organizationSchema.address.streetAddress = this.organizationData.address;
        }
        if (this.organizationData.city) {
          organizationSchema.address.addressLocality = this.organizationData.city;
        }
        if (this.organizationData.state) {
          organizationSchema.address.addressRegion = this.organizationData.state;
        }
        if (this.organizationData.zip) {
          organizationSchema.address.postalCode = this.organizationData.zip;
        }
        if (this.organizationData.phone) {
          organizationSchema.contactPoint.telephone = `[+${this.organizationData.phone}]`;
        }
        if (this.organizationData.email) {
          organizationSchema.contactPoint.email = this.organizationData.email;
        }
        if (this.organizationData.socialLinks && this.organizationData.socialLinks.length) {
          organizationSchema.sameAs = this.organizationData.socialLinks;
        }
        if (this.organizationData.foundingYear) {
          organizationSchema.foundingDate = this.organizationData.foundingYear;
        }
        if (this.organizationData.founders && this.organizationData.founders.length) {
          organizationSchema.founders = this.organizationData.founders;
        }
      }
      return organizationSchema;
    },

    scripts() {
      const scriptArray = [];
      if (this.productData) {
        scriptArray.push({
          innerHTML: JSON.stringify(this.productSchemaObject),
          type: 'application/ld+json',
        });
      }
      if (this.organizationData) {
        scriptArray.push({
          innerHTML: JSON.stringify(this.organizationSchemaObject),
          type: 'application/ld+json',
        });
      }

      return scriptArray;
    },
  },
  mounted() {
    this.$store.dispatch('setRoutingState', false);
    this.$store.dispatch('pushDataLayerEvent', {
      eventName: 'pageView',
      payload: {
        pageview: {
          route: this.$route.fullPath,
          title: this.seoTitle,
          description: this.seoDesc,
          image: this.seoImage,
        },
      },
      nonInteractive: true,
    });

    this.$announcer.set(`Navigated to ${this.seoTitle}`);
  },
};
