export const state = () => ({
  companyName: 'LostTrailParkingLot.com',
  baseUrl: 'https://losttrailparkinglot.com',
  appId: 'app',
  trackingEnabled: true,
  isMobile: null,
  isVertical: null,
  settings: {},
  routing: false,
  showCookieBanner: false,
});

export const getters = {
  companyName: (state) => {
    return state.companyName;
  },
  baseUrl: (state) => {
    return state.baseUrl;
  },
  appId: (state) => {
    return state.appId;
  },
  trackingEnabled: (state) => {
    return state.trackingEnabled;
  },
  googleTagManagerId: (state) => {
    return state.settings.google_tag_manager_container_id;
  },
  isMobile: (state) => {
    return state.isMobile;
  },
  isVertical: (state) => {
    return state.isVertical;
  },
  settings: (state) => {
    return state.settings;
  },
  cmsLabelByKey: (state) => (key) => {
    if (state.settings[key]) {
      return state.settings[key];
    }
    return '';
  },
  routingActive: (state) => {
    return state.routing;
  },
  showCookieBanner: (state) => {
    return state.showCookieBanner;
  },
};

export const mutations = {
  SET_IS_MOBILE(state, val) {
    state.isMobile = val;
  },
  SET_IS_VERTICAL(state, val) {
    state.isVertical = val;
  },
  SET_SETTINGS(state, data) {
    state.settings = data;
  },
  SET_ROUTING(state, val) {
    state.routing = val;
  },
  SET_TRACKING_STATE(state, val) {
    state.trackingEnabled = val;
  },
  SET_SHOW_COOKIE_BANNER(state, val) {
    state.showCookieBanner = val;
  },
};

export const actions = {
  async nuxtServerInit({dispatch}) {
    const allActions = [{action: 'getSettings'}, {action: 'navigation/getFullDecoratorNav'}];
    await Promise.all(allActions.map((entry) => dispatch(entry.action, entry.args)));
  },
  async getSettings({commit, dispatch}) {
    // const settingsDoc = await dispatch('getSingleLocalizedDoc', {
    //   predicateQuery: this.$prismic.predicates.at('document.type', 'settings'),
    // });
    const settingsDoc = {};
    commit('SET_SETTINGS', settingsDoc ? settingsDoc : {});
  },
  handlePageError(_, obj) {
    obj.error({
      statusCode: 404,
      message: `The page you are looking for does not exist. `,
      err: obj.errorType,
    });
  },
  initGTM({getters}) {
    if (getters.googleTagManagerId) {
      this.$gtm.init(getters.googleTagManagerId);
    }
  },
  pushDataLayerEvent({getters}, {eventName, payload, nonInteractive}) {
    if (getters.trackingEnabled) {
      window.dataLayer.push({
        event: `ltpl.${eventName}`,
        ...payload,
        nonInteractive: nonInteractive || true,
      });
    }
  },
  setIsMobile({commit}, val) {
    commit('SET_IS_MOBILE', val);
  },
  setIsVertical({commit}, val) {
    commit('SET_IS_VERTICAL', val);
  },
  setRoutingState({commit}, val) {
    commit('SET_ROUTING', val);
  },
  setTrackingState({commit}, val) {
    commit('SET_TRACKING_STATE', val);
  },
  // eslint-disable-next-line no-unused-vars
  routeChangeFocusManagement({state, dispatch}) {
    // Set active routing state
    dispatch('setRoutingState', true);

    // Set focus
    // TODO FIX ME.. this blows up when history.back to CLP
    // document.getElementById(state.appId).focus();
  },
  setBodyScrollLock(_, val) {
    if (process.browser) {
      const $body = document.querySelector('body');
      const scrollLockClass = 'scroll-lock';

      if (val) {
        $body.classList.add(scrollLockClass);
      } else {
        $body.classList.remove(scrollLockClass);
      }
    }
  },
  showCookieBanner({commit}, value) {
    commit('SET_SHOW_COOKIE_BANNER', value);
  },
};
