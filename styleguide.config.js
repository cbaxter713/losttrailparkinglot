const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  styleguideDir: 'dist/styleguide',
  assetsDir: 'static',
  require: [
    path.join(__dirname, '/styleguide/utils/dependencies.js'),
    path.join(__dirname, '/styleguide/utils/dummyData.js'),
    path.join(__dirname, '/styleguide/theme/script.js'),
    path.join(__dirname, '/styleguide/theme/styles.scss'),
  ],
  theme: {
    maxWidth: '100%',
    sidebarWidth: 300,
    color: {
      base: '#1e1f22',
      link: '#348658',
      linkHover: '#5ca93e',
      linkFocus: '#01882e',
    },
    buttonTextTransform: 'uppercase',
    fontFamily: {
      base: 'monaco',
    },
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  // eslint-disable-next-line no-unused-vars
  validExtends: (fullPath) => {
    return true;
  },
  sections: [
    {
      name: 'Core Styles',
      content: 'styleguide/docs/core-styles.md',
      components: () => [
        'styleguide/components/SgColors.vue',
        'styleguide/components/SgBackgrounds.vue',
        'styleguide/components/SgType.vue',
        'styleguide/components/SgSpacing.vue',
        'styleguide/components/SgInputs.vue',
        'styleguide/components/SgCTAS.vue',
      ],
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
    },
    {
      name: 'Base Components',
      content: 'styleguide/docs/base-components.md',
      components: 'components/base/**/*.vue',
      sectionDepth: 2,
    },
    {
      name: 'Blocks',
      components: 'components/blocks/**/*.vue',
      sectionDepth: 2,
    },
    {
      name: 'Layout Components',
      components: 'components/layout/**/*.vue',
      sectionDepth: 2,
    },
    {
      name: 'Patterns',
      components: 'components/patterns/**/*.vue',
      sectionDepth: 2,
    },
  ],
  webpackConfig: {
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(css?|scss)(\?.*)?$/,
          loaders: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                data: '@import "./assets/styles/imports.scss";',
              },
            },
          ],
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  },
};
