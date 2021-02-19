<template>
  <article class="post">
    <h1>{{post.title}}</h1>
  </article>
</template>

<script>
import { request, gql } from '@/cms/datocms';

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query BlogPostQuery($slug: String!) {
          post(filter: { slug: { eq: $slug } }) {
            title
            description
            publicationDate: _firstPublishedAt
          }
        }
      `,
      variables: {
        slug: params.slug
      }
    })

    return { ready: !!data, ...data }
  }
}
</script>
