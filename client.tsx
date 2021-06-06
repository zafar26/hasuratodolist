import {
  ApolloClient,
    InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://todolistpost.herokuapp.com/v1/graphql',
    
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
//   const secretKey = localStorage.getItem('token');
    
  // return the headers to the context so httpLink can read them
  return {
    headers: {
          ...headers,
        ['X-Hasura-Role']:'user',
        ['x-hasura-admin-secret']:'todolist'
    }
  }
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
    
  cache: new InMemoryCache()
});

export default client