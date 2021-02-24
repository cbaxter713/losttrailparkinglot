/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */

import Vue from 'vue';
import activeNav from '../utils/activeNav';
import 'codemirror/mode/jsx/jsx';

Vue.config.productionTip = false;

document.addEventListener('DOMContentLoaded', () => {
  activeNav.methods.init();
});

window.addEventListener('hashchange', () => {
  activeNav.methods.init();
});
