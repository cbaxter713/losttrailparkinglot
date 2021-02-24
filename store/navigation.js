export const state = () => ({
  headerData: null,
  footerData: null,
  navActive: false,
  mastheadThemeLight: false,
  mastheadTextReversed: false,
  mastheadScrolling: false,
});

export const getters = {
  headerData: (state) => {
    return state.headerData;
  },
  footerData: (state) => {
    return state.footerData;
  },
  navActive: (state) => {
    return state.navActive;
  },
  mastheadThemeLight: (state) => {
    return state.mastheadThemeLight;
  },
  mastheadScrolling: (state) => {
    return state.mastheadScrolling;
  },
  mastheadTextReversed: (state) => {
    return state.mastheadTextReversed;
  },
};

export const mutations = {
  SET_HEADER_DATA(state, obj) {
    state.headerData = obj;
  },
  SET_FOOTER_DATA(state, obj) {
    state.footerData = obj;
  },
  SET_NAV_ACTIVE(state, val) {
    state.navActive = val;
  },
  SET_MASTHEAD_THEME_LIGHT(state, val) {
    state.mastheadThemeLight = val;
  },
  SET_MASTHEAD_TEXT_REVERSED(state, val) {
    state.mastheadTextReversed = val;
  },
  SET_MASTHEAD_SCROLLING(state, val) {
    state.mastheadScrolling = val;
  },
};

export const actions = {
  async getMainNav({commit}) {
    const formattedNavData = {};

    commit('SET_HEADER_DATA', formattedNavData);
    return formattedNavData;
  },
  async getFooterNav({commit}) {
    const formattedFooterData = {};

    commit('SET_FOOTER_DATA', formattedFooterData);
    return formattedFooterData;
  },
  async getFullDecoratorNav({dispatch}) {
    const headerNavData = await dispatch('getMainNav');
    const footerNavData = await dispatch('getFooterNav');

    return {
      headerNav: headerNavData,
      footerNav: footerNavData,
    };
  },
  toggleNav({getters, commit, dispatch}) {
    if (getters.navActive) {
      dispatch('deactivateNav');
    } else {
      commit('SET_NAV_ACTIVE', true);
    }
  },
  setNavState({commit}, value) {
    commit('SET_NAV_ACTIVE', value);
  },
  activateNav({commit}) {
    commit('SET_NAV_ACTIVE', true);
  },
  deactivateNav({commit, dispatch}) {
    commit('SET_NAV_ACTIVE', false);
    dispatch('search/setSearchQuery', null, {root: true});
  },
  deactivateNavFromSearch({commit, dispatch}) {
    commit('SET_ACTIVE_NAV_INDEX', null);

    setTimeout(() => {
      dispatch('deactivateNav');
    }, 0);
  },
  setMastheadThemeLight({commit}, val) {
    commit('SET_MASTHEAD_THEME_LIGHT', val);
  },
  setMastheadTextReversed({commit}, val) {
    commit('SET_MASTHEAD_TEXT_REVERSED', val);
  },
  setMastheadScrolling({commit}, val) {
    commit('SET_MASTHEAD_SCROLLING', val);
  },
};
