export const routes = {
  home: () => {
    return `/`;
  },
  post: (slug) => {
    return `/posts/${slug}`;
  }
};
