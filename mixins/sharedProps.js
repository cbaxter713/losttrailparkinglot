export const themeProps = {
  props: {
    theme: {
      type: String,
      default: 'light',
      validator: function (value) {
        return ['light-gray', 'gray', 'light', 'dark', 'primary'].includes(value);
      },
    },
  },
};
