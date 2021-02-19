<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        {{ page.title }}
      </h1>
    </div>
  </div>
</template>

<script>
import { request, gql } from '@/cms/datocms'

export default {
  async asyncData() {
    const data = await request({
      query: gql`
        {
          page: homePage {
            title
          }
        }
      `
    })

    return { ready: !!data, ...data }
  },

}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: red;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
