import Head from "next/head";
// import { useQuery } from "@apollo/client";

// import GET_ALL_POSTS from "../app/queries/getAllPosts.graphql";
import { useContext } from "react";
import PostCardBody from "../app/components/PostCard/PostCardBody";
import { usePosts } from "../app/context/PostContext";
import HeaderFixed from "../app/layouts/HeaderFixed";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { reviews } = usePosts();
  console.log(reviews);

  return (
    <HeaderFixed>
      <div className="bg-white">
        <div className="px-1 ">
          <ul className="grid grid-cols-2 gap-x-2	gap-y-2">
            {reviews && reviews.map((item) => <PostCardBody item={item} />)}
          </ul>
        </div>
      </div>
    </HeaderFixed>
  );
}
