<template>
  <article class="home-page">
    <div class="title-container">
      <h1 class="title">
        Lost Trail Parking Lot
        <span class="dotcom">.com</span>
      </h1>
    </div>
  </article>
</template>

<script>
import {request, gql} from '@/cms/datocms';
import {pageMeta} from '@/mixins/pageMeta';

export default {
  mixins: [pageMeta],
  async asyncData() {
    const data = await request({
      query: gql`
        {
          page: homePage {
            title
          }

          posts: allPosts(first: 3) {
            slug
            title
            description
          }
        }
      `,
    });

    return {ready: !!data, ...data};
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4.44vw;
}

.title-container {
  width: fit-content;

  /* The magic */
  -webkit-background-clip: text;
  color: transparent;

  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://media2.giphy.com/media/l2x7mzCCX7oDX2r0PD/giphy.gif);
}

.title {
  margin: 0;
  max-width: 8ex;
  font-size: 20vw;
  font-weight: 600;
  line-height: 1;

  @media (min-width: 900px) {
    font-size: 200px;
  }
}

.dotcom {
  display: block;
}
</style>
