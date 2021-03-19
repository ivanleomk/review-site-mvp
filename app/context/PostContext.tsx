import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import GET_ALL_REVIEWS from "../queries/getAllReviews.graphql";
import { useUsers } from "./UserContext";

// const initialPostArg: Post[] = [];
const initialReviewArg: Review[] = [];

export type PostContextType = {
  reviews: Review[];
  loading: boolean;
};

export const PostContext = createContext<PostContextType>({
  reviews: [],
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
  // const [posts, setPosts] = useState(initialPostArg);
  const [reviews, setReviews] = useState(initialReviewArg);
  const { headers } = useUsers();
  const { data, loading, error } = useQuery(GET_ALL_REVIEWS, {
    pollInterval: 3000,
    context: { headers },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      const { review: reviews } = data;
      setReviews(reviews);

      // const { post: posts } = data;
      // setPosts(posts);
    }
  }, [loading]);

  const sharedState = {
    reviews,
    loading,
  };

  return <PostContext.Provider value={sharedState} {...props} />;
};
