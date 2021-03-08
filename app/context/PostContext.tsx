import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import GET_ALL_POSTS from "../queries/getAllPosts.graphql";

export type PostContextType = {
  posts: Post[];
  loading: boolean;
};

const initialPostArg: Post[] = [];

export const PostContext = createContext<PostContextType>({
  posts: initialPostArg,
  loading: false,
});

export const usePosts = () => {
  const innerPostContext = useContext(PostContext);
  if (!innerPostContext) {
    throw new Error(`usePost must be used within a provider`);
  }
  return innerPostContext;
};

export const PostProvider = (props) => {
  const [posts, setPosts] = useState(initialPostArg);
  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    pollInterval: 3000,
  });

  useEffect(() => {
    if (data && data.post) {
      const { post: posts } = data;
      setPosts(posts);
    }
  }, [loading]);

  const sharedState = {
    posts,
    loading,
  };

  return <PostContext.Provider value={sharedState} {...props} />;
};
