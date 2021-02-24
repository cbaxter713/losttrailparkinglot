<template>
  <svg class="base-icon" focusable="false">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
/**
 * Base icon component that leverages the icon-definitions component to display any of the
 * already setup SVG icons from icon-definitions
 */

export default {
  name: 'BaseIcon',
  props: {
    /**
     * Name of icon to display
     */
    icon: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.base-icon /deep/ {
  width: 1em;
  height: 1em;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

<docs>
    ### Icon Examples
    ```jsx
    const mainIcons = {
        name: 'Main',
        size: 28,
        icons: [
            'arrow-down',
            'arrow-left',
            'arrow-right',
            'arrow-up',
            'check',
            'chevron-down',
            'chevron-left',
            'chevron-right',
            'chevron-up',
            'compass',
            'star-full',
            'star-half',
            'star-empty',
            'user',
            'close',
            'zoom-in',
            'zoom-out',
            'heart',
            'mail',
            'map',
            'map-pin',
            'chat',
            'phone',
            'search',
            'bag',
            'trash',
            'caret',
            'twitter',
            'pinterest',
            'youtube',
            'instagram',
            'facebook'
        ]
    }

    <div>
        <section v-for="iconGroup in [mainIcons]"
                 :style="{marginBottom: '30px'}">
            <h3>{{iconGroup.name}} Icons</h3>
            <div v-for="icon in iconGroup.icons"
                 :style="{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px'
                 }">
                <base-icon :icon="icon"
                           :style="{
                              width: `${iconGroup.size}px`,
                              height: `${iconGroup.size}px`
                           }"></base-icon>
                <p :style="{margin: '0 0 0 20px'}">{{icon}}</p>
            </div>
        </section>
        <icon-definitions></icon-definitions>
    </div>
    ```
</docs>
