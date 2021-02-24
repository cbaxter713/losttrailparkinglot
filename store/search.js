export const state = () => ({
  searchQuery: '',
});

export const getters = {
  searchQuery: (state) => {
    return state.searchQuery;
  },
};

export const mutations = {
  SET_SEARCH_QUERY(state, val) {
    state.searchQuery = val;
  },
};

export const actions = {
  setSearchQuery({commit}, value) {
    commit('SET_SEARCH_QUERY', value);
  },
  async fullSiteSearch({dispatch}, searchTerm) {
    const products = await dispatch('searchProducts', searchTerm);
    const content = await dispatch('searchContent', {searchTerm});

    return {
      products,
      content,
    };
  },
  async searchProducts(_, searchTerm) {
    let filteredProducts = [];

    if (searchTerm && searchTerm.length) {
      // Minor reformatting to match common search term to product naming convention
      const reformattedSearchTerm = searchTerm.replace(`mens`, `men's`);

      // TODO: implement product search
      const productSearchResults = [];

      filteredProducts = productSearchResults
        ? productSearchResults.filter((item) => item && item.name)
        : [];
    }
    return filteredProducts;
  },
  async searchContent(_, {searchTerm, contentTypes = null}) {
    let searchResults = [];
    const contentTypesToSearch =
      contentTypes && contentTypes.length
        ? [...contentTypes]
        : ['content_page', 'shoe_finder', 'story', 'stories_landing', 'gift_cards', 'page'];

    // TODO: implement content search here

    return searchResults;
  },
};
