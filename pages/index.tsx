import Head from "next/head";
// import { useQuery } from "@apollo/client";

// import GET_ALL_POSTS from "../app/queries/getAllPosts.graphql";
import { useContext } from "react";
import { usePosts } from "../app/context/PostContext";
import HeaderFixed from "../app/layouts/HeaderFixed";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { posts } = usePosts();

  return <HeaderFixed>This is a body paragraph</HeaderFixed>;
}
