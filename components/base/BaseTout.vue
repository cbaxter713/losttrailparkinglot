<template>
  <div class="tout-container" :class="[theme, alignment]">
    <img v-if="badge" class="tout-badge" :alt="badge.alt" :src="badge.url" />
    <h6 v-if="subhead" class="tout-subhead subheading-100">{{ subhead }}</h6>
    <component
      v-if="title"
      :is="headingType"
      class="tout-title"
      :class="[titleClass, {'fancy-title': hasCopy}]"
    >
      {{ title }}
    </component>
    <div v-if="copy" :class="copySize" class="tout-copy" v-html="copy"></div>
    <div v-if="links && links.length" class="tout-link-wrapper">
      <div v-for="(link, index) in links" :key="`tout-link-${index}`">
        <template v-if="link.link && link.link.url">
          <base-cta-link
            v-if="link.style === 'cta'"
            class="tout-link tout-cta"
            :cms-link="link.link"
            :button="true"
            size="75"
          >
            {{ link.text }}
          </base-cta-link>
          <base-button
            v-else
            class="tout-link"
            :theme="link.style"
            :icon="link.icon"
            :linkPath="link.link.url"
            :external-link="link.link.external"
            :target="link.link.target"
          >
            {{ link.text }}
          </base-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCtaLink from './BaseCtaLink';

export default {
  name: 'BaseTout',
  components: {BaseButton, BaseCtaLink},
  props: {
    theme: {
      type: String,
      default: 'positive',
      validator: (value) => {
        return ['positive', 'negative'].includes(value);
      }
    },
    alignment: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right', 'center'].includes(value);
      }
    },
    badge: {
      type: Object
    },
    subhead: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    headingType: {
      type: String,
      default: 'h1',
      validator: (value) => {
        return ['h1', 'h2'].includes(value);
      }
    },
    titleClass: {
      type: String,
      default: 'heading-2',
      validator: (value) => {
        return [
          'display-1',
          'display-2',
          'display-3',
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4'
        ].includes(value);
      }
    },
    copy: {
      type: String,
      default: ''
    },
    copySize: {
      type: String,
      default: 'base',
      validator: (value) => {
        return ['small', 'base', 'large'].includes(value);
      }
    },
    links: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    hasCopy() {
      return this.copy;
    }
  }
};
</script>

<style scoped lang="scss">
.tout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .tout-title.fancy-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

.tout-badge {
  width: 100px;
  height: auto;
  object-fit: contain;
  margin: 0 auto $spacing-150 auto;
}

.tout-subhead {
  margin: 0 0 $spacing-100 0;
  color: $color-gray-500;
  font-size: $font-size-125;
  text-transform: uppercase;
}

.tout-title {
  margin: 0;

  &.fancy-title {
    @include fancyTitle;
  }
}

.tout-copy {
  max-width: $text-block-width;
  margin: 0 auto;
  font-size: $font-size-100;

  /deep/ > * {
    margin: 0;
  }

  @media (min-width: $screen-sm) {
    font-size: $font-size-150;
  }

  .left &,
  .right & {
    margin: 0;
  }
}

.tout-link-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: $spacing-200 0 0 0;

  div:not(:only-child):first-child {
    margin-bottom: $spacing-200;
  }

  @media (min-width: $screen-sm) {
    flex-direction: row;

    div:not(:only-child):first-child {
      margin-right: $spacing-200;
      margin-bottom: unset;
    }
  }
}

.left {
  @media (min-width: $screen-sm) {
    justify-content: flex-start;
    text-align: left;

    .tout-badge {
      margin: 0 0 $spacing-150 0;
    }

    .tout-title.fancy-title::after {
      left: 0;
      transform: translateY(0%);
    }

    .tout-link-wrapper {
      justify-content: flex-start;
    }
  }
}

.right {
  @media (min-width: $screen-sm) {
    justify-content: flex-end;
    text-align: right;

    .tout-badge {
      margin-left: calc(100% - 100px);
    }

    .tout-title.fancy-title::after {
      right: 0;
      left: unset;
      transform: translateY(0%);
    }

    .tout-link-wrapper {
      justify-content: flex-end;
    }
  }
}

.negative /deep/ {
  background: transparent;
  color: $color-white;

  .tout-subhead,
  .tout-title,
  .tout-copy,
  .cta-label {
    color: $color-white;
  }
}
</style>

<docs>
  ### Examples

  ```jsx
  const copy = "Typing quickly and efficiently can result in spontaneous discomfort, studies have shown. This outcome can be prevented by intravenous administration of liquified silica gel. Do not delay, get yours today!"

  const links = [
    {
      icon: 'arrow-down',
      link: {},
      style: 'button',
      text: 'Read More'
    },
    {
      icon: 'search',
      link: {},
      style: 'cta',
      text: 'Find Silica Gel'
    }
  ]

  <base-tout
    :theme="'positive'"
    :alignment="'center'"
    :subhead="'Check it out'"
    :title="'Stenographers Beware'"
    :titleClass="'display-2'"
    :copy="copy"
    :links="links"
  />
  ```

  ```jsx
  const copy = "Typing quickly and efficiently can result in spontaneous discomfort, studies have shown. This outcome can be prevented by intravenous administration of liquified silica gel. Do not delay, get yours today!"

  const links = [
    {
      icon: '',
      link: {},
      style: 'cta',
      text: 'Explore'
    }
  ]

  <base-tout
    :theme="'positive'"
    :alignment="'left'"
    :subhead="'Check it out'"
    :title="'Stenographers Beware! This one trick could save your life'"
    :copy="copy"
    :badge="'/images/styleguide/bitmap2x.png'"
    :links="links"
  />
  ```

  ```jsx
  const copy = "Typing quickly and efficiently can result in spontaneous discomfort, studies have shown. This outcome can be prevented by intravenous administration of liquified silica gel. Do not delay, get yours today!"

  const links = [
    {
      icon: 'arrow-right',
      link: {},
      style: 'button',
      text: 'Read more'
    }
  ]

  <base-tout
    :theme="'positive'"
    :alignment="'right'"
    :subhead="'Check it out'"
    :title="'Attention, Stenographers'"
    :titleClass="'heading-4'"
    :copy="copy"
    :badge="'/images/styleguide/bitmap2x.png'"
    :links="links"
  />
  <icon-definitions></icon-definitions>
  ```

  ```jsx

  const links = [
    {
      icon: 'arrow-right',
      link: {},
      style: 'button',
      text: 'Read more'
    }
  ]

  <base-tout
    :theme="'positive'"
    :alignment="'center'"
    :subhead="'Check it out'"
    :title="'Attention, Stenographers'"
    :titleClass="'heading-4'"
    :badge="'/images/styleguide/bitmap2x.png'"
    :links="links"
  />
  <icon-definitions></icon-definitions>
  ```
</docs>
