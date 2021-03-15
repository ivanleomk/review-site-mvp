//Typescript Imports
import type { AppProps } from "next/app";

// Apollo Client Imports
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

// Library Imports
import { ChakraProvider } from "@chakra-ui/react";

// Context Imports
import { PostProvider } from "../app/context/PostContext";

import "tailwindcss/tailwind.css";
import { UserProvider } from "../app/context/UserContext";

// Amplify Imports
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import CustomerProtectedRoute from "../app/HOC/customerProtectedRoutes";
Amplify.configure({
  ...config,
  ssr: true,
});

const client = new ApolloClient({
  uri: "https://server.makanreviews.com/v1/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <UserProvider>
          <PostProvider>
            <CustomerProtectedRoute>
              <Component {...pageProps} />
            </CustomerProtectedRoute>
          </PostProvider>
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
