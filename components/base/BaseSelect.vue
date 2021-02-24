<template>
  <zr-select v-bind="$props" class="base-select" @input="updateValue"></zr-select>
</template>

<script>
import {ZrSelect} from '@zaneray/vue-components';

/**
 * Select component that leverages the Zaneray select documented at https://zr-vue.netlify.com/#/Base%20Components/ZrSelect
 */

export default {
  name: 'BaseSelect',
  components: {ZrSelect},
  extends: ZrSelect,
  methods: {
    updateValue(event) {
      this.$emit('input', event, this.$props.name);
    }
  }
};
</script>

<style scoped lang="scss">
.base-select.base-select /deep/ {
  margin: 0;

  .select-wrapper {
    &::after {
      width: 1.75rem;
      right: 0.75rem;
      background-image: url('data:image/svg+xml;base64,ICA8c3ZnIGlkPSJpY29uLWNoZXZyb24tZG93biIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHBhdGgKICAgICAgZmlsbD0iIzFlMWYyMiIKICAgICAgZD0iTTUuMjkzIDkuNzA3bDYgNmMwLjM5MSAwLjM5MSAxLjAyNCAwLjM5MSAxLjQxNCAwbDYtNmMwLjM5MS0wLjM5MSAwLjM5MS0xLjAyNCAwLTEuNDE0cy0xLjAyNC0wLjM5MS0xLjQxNCAwbC01LjI5MyA1LjI5My01LjI5My01LjI5M2MtMC4zOTEtMC4zOTEtMS4wMjQtMC4zOTEtMS40MTQgMHMtMC4zOTEgMS4wMjQgMCAxLjQxNHoiCiAgICAvPgogIDwvc3ZnPg==');
      background-repeat: no-repeat;
    }
  }

  select {
    @include formInput;

    line-height: 1.2;

    option[disabled='disabled'] {
      color: $color-gray-400;
    }
  }

  label {
    @include formLabel;

    margin-bottom: $spacing-50;
  }
}
</style>

<docs>
  ### Basic select
  ```jsx
  <BaseSelect label="Basic select"
              :options="selectOptions"
              id="basicSelect">
  </BaseSelect>
  ```

  ### Select with placeholder
  ```jsx
  <BaseSelect label="Select with placeholder"
              :options="selectOptions"
              placeholder="Placeholder here"
              id="placeholderSelect">
  </BaseSelect>
  ```

  ### Select with preselected value
  ```jsx
  <BaseSelect label="Preselected Select"
              :options="selectOptions"
              id="preselectedSelect"
              :value="3">
  </BaseSelect>
  ```
</docs>
