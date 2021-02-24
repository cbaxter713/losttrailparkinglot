export const state = () => ({
  docs: {},
  stories: [],
});

export const getters = {
  contentDocs: (state) => {
    return state.docs;
  },
  contentDocByUID: (state) => (uid) => {
    return state.docs[uid];
  },
  categoryDocs: (state) => (category) => {
    return state[category] || [];
  },
  categoryDocByUID: (state) => (category, uid) => {
    if (state[category]) {
      return state[category].find((item) => item.uid === uid);
    }
    return null;
  },
};

export const mutations = {
  SET_CONTENT_DOC(state, contentData) {
    state.docs[contentData.uid] = contentData.doc;
  },
  SET_CATEGORY_DOC(state, obj) {
    state[obj.category].push(obj.data);
  },
};

export const actions = {};
