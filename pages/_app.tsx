//Typescript Imports
import type { AppProps } from "next/app";

// Apollo Client Imports
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
import { routes } from "../@types/applicationRoutes";
import ApolloWrapper from "../app/HOC/ApolloWrapper";
Amplify.configure({
  ...config,
  ssr: true,
});

// const httpLink = createHttpLink({
//   uri: routes.SERVER_PAGE,
// });

// // Apollo Client Init
// const client = new ApolloClient({
//   uri: "https://server.makanreviews.com/v1/graphql",
//   cache: new InMemoryCache(),
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <ApolloWrapper>
          <PostProvider>
            <CustomerProtectedRoute>
              <Component {...pageProps} />
            </CustomerProtectedRoute>
          </PostProvider>
        </ApolloWrapper>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
