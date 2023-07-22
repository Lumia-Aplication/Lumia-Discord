const { ApolloClient, InMemoryCache, createHttpLink } = require('@apollo/client');
require('dotenv').config();

const httpLink = createHttpLink({
  uri: `${process.env.SERVER_URL}`
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

module.exports = { apolloClient };