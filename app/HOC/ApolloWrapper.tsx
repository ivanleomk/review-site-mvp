import React from "react";
import { useUsers } from "../context/UserContext";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { routes } from "../../@types/applicationRoutes";

const { SERVER_PAGE } = routes;

const ApolloWrapper = ({ children }) => {
  const { headers: userHeaders } = useUsers();
  const httpLink = createHttpLink({
    uri: SERVER_PAGE,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...userHeaders,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
