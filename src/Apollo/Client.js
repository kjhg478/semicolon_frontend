import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://semicolonteam-backand.herokuapp.com",
    clientState: {
        defaults,
        resolvers
    },
    request: async operation => {
        const token = await localStorage.getItem('token');
        console.log(token);
        return operation.setContext({
            headers: { Authorization: `Bearer ${token}` }
        });
    }
});