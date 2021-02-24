<template>
  <section>
    <h3>Standard Form</h3>
    <div class="sg-form sg-form-container">
      <form id="example-1">
        <base-text-input id="email" label="Email Address" type="email" placeholder="Enter a valid email" full />
        <base-text-input id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" full />
        <base-select id="favorite-food" label="Favorite Food" :options="selectOptions" full />
        <base-alert message="An error has occured" type="danger" />
        <base-button theme="primary" type="submit" full>Create Account</base-button>
      </form>
    </div>
    <h3>Radios & Checkboxes</h3>
    <div class="sg-form">
      <form id="example-2">
        <div class="sg-form-columns">
          <div class="radios">
            <h4>Select Shipping</h4>
            <base-radio id="radio-1" name="radio-example" value="1" label="UPS Standard Ground" />
            <base-radio id="radio-2" name="radio-example" value="2" label="Zeppelin Standard Air" />
            <base-radio id="radio-3" name="radio-example" value="3" label="U-Boat Standard Underwater" />
          </div>
          <div class="checkboxes">
            <h4>Choose Options</h4>
            <base-checkbox id="checkbox-1" name="checkbox-example" value="1" label="Extra traction" />
            <base-checkbox id="checkbox-2" name="checkbox-example" value="2" label="Spare Laces" />
            <base-checkbox id="checkbox-3" name="checkbox-example" value="3" label="Cushy inserts" />
          </div>
        </div>
      </form>
    </div>
    <h3>Miscelaneous Inputs</h3>
    <div class="sg-form">
      <form id="example-3">
        <div class="sg-input">
          <h4>Counter</h4>
          <base-counter :min="1" :max="10" />
        </div>
        <div class="sg-input">
          <h4>Range Slider</h4>
          <base-range-slider :min-value="10" :max-value="70" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import BaseTextInput from '../../components/base/BaseTextInput';
import BaseSelect from '../../components/base/BaseSelect';
import BaseButton from '../../components/base/BaseButton';
import BaseRadio from '../../components/base/BaseRadio';
import BaseCheckbox from '../../components/base/BaseCheckbox';
import BaseAlert from '../../components/base/BaseAlert';
import BaseRangeSlider from '../../components/base/BaseRangeSlider';
import BaseCounter from '../../components/base/BaseCounter';

/**
 * Input Elements - User inputs for use in forms and other interactive user interfaces.
 */

export default {
  name: 'Inputs',
  components: {BaseCounter, BaseRangeSlider, BaseAlert, BaseCheckbox, BaseRadio, BaseButton, BaseSelect, BaseTextInput},
  data() {
    return {
      selectOptions: [
        {label: 'Pizza', value: 1},
        {label: 'Burger', value: 2},
        {label: 'Spatchcocked Turkey', value: 3},
        {label: 'Pop Tarts', value: 4}
      ]
    };
  },
  computed: {

  }
};
</script>

<style scoped lang="scss">
.sg-form {
  margin: $spacing-200 0 $spacing-400;
}

.sg-form-container {
  max-width: 380px;
}

.sg-input {
  margin-bottom: $spacing-250;
}

.sg-form-columns {
  display: grid;
  grid-row-gap: $spacing-100;
  grid-column-gap: $spacing-100;

  @media (min-width: ($screen-sm)) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<docs>
```jsx
<inputs></inputs>
```
</docs>
