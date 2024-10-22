import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql', // Replace with your backend URL
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}` || '',
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
