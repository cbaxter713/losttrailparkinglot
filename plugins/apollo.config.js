export default (context) => {
  return {
    httpEndpoint: 'http://localhost:4000/graphql-alt',

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => 'Bearer my-static-token',
  }
}
