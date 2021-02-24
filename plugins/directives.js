import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VueAnnouncer from 'vue-announcer';

/**
 * Used for closing an active element when clicking outside
 */
Vue.use(vClickOutside);

/**
 * Used for setting announcements to the screen reader during appropriate times,
 * to inform a user about changes to the interface.
 */
Vue.use(VueAnnouncer);
