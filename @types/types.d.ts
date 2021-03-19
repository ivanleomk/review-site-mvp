interface PostcardProps {
  title: string;
  description: string;
}

interface Comment {
  comment_text: string;
  post_id: number;
  customer_username: string;
}

interface TagItem {
  title: String;
}

interface Tag {
  tag: TagItem;
}

interface LikeItem {
  aggregate: {
    count: number;
  };
}

interface Like {
  customer_username: String;
}

// interface Post {
//   customer_username: string;
//   description: string;
//   title: string;
//   comments: Comment[];
//   tags: Tag[];
//   liked: LikeItem;
//   likes: Like[];
// }

interface Picture {
  picture_url: string;
}

interface Review {
  review_id: number;
  customer_username: string;
  pictures: Picture[];
  review_link: string;
  review_price: float;
  review_title: string;
}
