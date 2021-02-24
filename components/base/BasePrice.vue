<template>
  <div :class="['price-container', {'on-sale': isOnSale}]">
    <zr-currency
      class="regular-price price-display"
      :value="regularPrice"
      :currency-code="currencyCode"
    ></zr-currency>
    <zr-currency
      v-if="isOnSale"
      class="sale-price price-display"
      :value="salePrice"
      :currency-code="currencyCode"
    ></zr-currency>
  </div>
</template>

<script>
import {ZrCurrency} from '@zaneray/vue-components';

/**
 * Price display of currency/locale formatted regular and sale price
 */

export default {
  name: 'BasePrice',
  components: {ZrCurrency},
  props: {
    /**
     * Regular retail price (default price)
     */
    regularPrice: {
      type: Number,
      default: 0,
      required: true
    },
    /**
     * Sale price, if it exists
     */
    salePrice: {
      type: Number,
      default: 0
    },
    /**
     * Currency code to format the price to
     */
    currencyCode: {
      type: String,
      default: 'USD'
    }
  },
  computed: {
    isOnSale() {
      return this.salePrice && this.salePrice < this.regularPrice;
    }
  }
};
</script>

<style scoped lang="scss">
.price-container {
  display: flex;
  font-size: $font-size-100;
}

.price-display {
  display: block;
  line-height: 1;
}

.regular-price {
  color: $color-gray-800;

  .on-sale & {
    text-decoration: line-through;
    color: $color-gray-400;
  }
}

.sale-price {
  margin-left: 0.5em;
  color: $color-action;
}
</style>

<docs>
  ### Examples

  #### Regular price display
  ```jsx
  <base-price :regular-price="49"></base-price>
  ```

  #### Sale price display
  ```jsx
  <base-price :regular-price="100" :sale-price="78"></base-price>
  ```

  #### Price with non-USD currency
  ```jsx
  <base-price :regular-price="199" currency-code="JPY"></base-price>
  <base-price :regular-price="199" currency-code="CAD"></base-price>
  <base-price :regular-price="199" currency-code="EUR"></base-price>
  ```
</docs>
