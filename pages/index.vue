<template>
  <article class="home-page">
    <div class="title-container">
      <h1 class="title">
        Lost Trail Parking Lot
        <span class="dotcom">.com</span>
      </h1>
    </div>
    <!--    <ul v-if="posts" class="posts-list">-->
    <!--      <li v-for="post in posts" :key="`post-${post.slug}`" class="post-item">-->
    <!--        <nuxt-link :to="routes.post(post.slug)">{{ post.title }}</nuxt-link>-->
    <!--      </li>-->
    <!--    </ul>-->
  </article>
</template>

<script>
import {request, gql} from '@/cms/datocms';

export default {
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

<style lang="scss">
$background-color: #000;
$title-breakpoint: 900px;

.home-page {
  background-color: $background-color;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4.44vw;

  * {
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}

.title-container {
  width: fit-content;

  /* The magic */
  -webkit-background-clip: text;
  color: transparent;

  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://media2.giphy.com/media/l2x7mzCCX7oDX2r0PD/giphy.gif);

  @media (min-width: $title-breakpoint) {
    max-width: 900px;
  }
}

.title {
  margin: 0;
  font-size: 20vw;
  font-weight: 600;
  line-height: 1;

  @media (min-width: $title-breakpoint) {
    font-size: 200px;
  }
}

.dotcom {
  display: block;
}
</style>
