<template>
  <portal to="modalPortal">
    <trap :disabled="!focusTrap">
      <transition name="modal">
        <div v-if="active" class="modal-wrapper" :class="{'has-image': hasImage}">
          <theme class="modal-inner" :theme="theme">
            <header v-if="title || mobileImage" class="modal-header">
              <base-picture
                :desktop-img="desktopImage"
                :mobile-img="mobileImage"
                :alt-text="altText"
                class="modal-image"
              />
              <h2 v-if="title" class="modal-title heading-1" :class="{'fancy-title': !hasImage}">
                {{ title }}
              </h2>
            </header>
            <div class="modal-body">
              <layout-container v-if="content">
                <div class="modal-content" v-html="content"></div>
              </layout-container>
              <slot />
            </div>
          </theme>
          <base-close
            class="close-button"
            :class="{reversed: closeReversed}"
            @click.native="closeModal"
          />
        </div>
      </transition>
    </trap>
  </portal>
</template>

<script>
import Trap from 'vue-focus-lock';
import BasePicture from '../base/BasePicture';
import Theme from './Theme';
import BaseClose from '../base/BaseClose';
import LayoutContainer from '../layout/LayoutContainer';
import {themeProps} from '../../mixins/sharedProps';

export default {
  name: 'Modal',
  components: {LayoutContainer, BaseClose, Trap, Theme, BasePicture},
  mixins: [themeProps],
  model: {
    prop: 'active',
    event: 'close',
  },
  props: {
    /**
     * Whether or not to show the modal
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Text to display as title of the modal
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * HTML to display as content of modal
     */
    content: {
      type: String,
      default: '',
    },
    /**
     * Image to display across header at mobile
     */
    mobileImage: {
      type: String,
      default: '',
    },
    /**
     * Image to display across header at desktop
     */
    desktopImage: {
      type: String,
      default: '',
    },
    /**
     * Alt text for the image
     */
    altText: {
      type: String,
      default: '',
    },
    closeReversed: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the focus trap should be enabled
     */
    focusTrap: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    hasImage() {
      return this.mobileImage;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close', false);
    },
    escapeHandler() {
      if (event.keyCode === 27) {
        this.closeModal();
      }
    },
  },
  watch: {
    active: {
      immediate: true,
      handler: function (value) {
        this.$store.dispatch('setBodyScrollLock', value);
      },
    },
  },
  mounted() {
    window.addEventListener('keyup', this.escapeHandler);
  },
  destroyed() {
    window.removeEventListener('keyup', this.escapeHandler);
  },
};
</script>

<style scoped lang="scss">
$modal-breakpoint: $screen-sm;
$modal-content-width: 640px;

.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: $z-index-level-modal + 1;
}

.modal-inner {
  width: 100%;
  height: 100%;
  padding-bottom: $component-spacing-mobile;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-header {
  display: block;
  position: relative;
  width: 100%;
  padding: $spacing-500 $gutter-mobile $spacing-150;

  @media (min-width: $modal-breakpoint) {
    padding: $spacing-700 $gutter-mobile $spacing-200;
  }

  .has-image & {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    margin-bottom: $spacing-350;
    padding: $gutter-mobile;

    @media (min-width: $modal-breakpoint) {
      height: 400px;
      margin-bottom: $spacing-500;
    }
  }
}

.modal-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  /deep/ img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.modal-title {
  position: relative;
  max-width: $modal-content-width;
  margin: 0 auto;

  &.fancy-title {
    @include fancyTitle;

    @media (min-width: $modal-breakpoint) {
      padding-bottom: calc(#{$spacing-225} + 6px);
    }
  }

  .has-image & {
    font-size: $spacing-225;
    color: $color-white;
    text-align: center;

    @media (min-width: $modal-breakpoint) {
      font-size: $spacing-400;
    }
  }
}

.modal-content /deep/ {
  max-width: $modal-content-width;
  margin: 0 auto;

  @media (min-width: $modal-breakpoint) {
    p {
      font-size: $font-size-150;
    }
  }
}

.close-button {
  position: fixed;
  top: $spacing-150;
  right: $spacing-150;
  z-index: 1;

  @media (min-width: $modal-breakpoint) {
    top: $spacing-200;
    right: $spacing-200;
  }

  &.reversed {
    background-color: $base-type-color;

    /deep/ svg {
      fill: $color-primary;
    }
  }
}
</style>

<docs>
### Examples

```jsx
const showLayer = false;
const showLayerWithImage = false;
const showLayerWithSlot = false;

<div>
  <base-button @click.native="showLayer = true" style="margin-bottom: 16px">Default Modal</base-button>
  <base-button @click.native="showLayerWithImage = true" style="margin-bottom: 16px">Modal w/ Image</base-button>
  <base-button @click.native="showLayerWithSlot = true" style="margin-bottom: 16px">Modal w/ Slot</base-button>
  <modal v-model="showLayer" title="Default Modal Title" :content="text.paragraphs" />
  <modal v-model="showLayerWithImage" title="Modal w/ Image" :content="text.paragraphs" :desktop-image="images.banner_image.url" :mobile-image="images.banner_image.mobile.url" alt-text="An Image" />
  <modal v-model="showLayerWithSlot" title="Modal w/ Slot" :content="text.paragraphs">
    <h5>Some other markup in the slot</h5>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
  </modal>
  <icon-definitions></icon-definitions>
</div>
```
</docs>
