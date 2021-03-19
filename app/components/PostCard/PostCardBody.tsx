import Image from "next/image";

import React, { FC } from "react";

type Picture = {
  picture_url: string;
};

type Review = {
  customer_username: string;
  review_id: number;
  review_price: number;
  review_link: string;
  review_title: string;
  pictures: Picture[];
};

type PostCardBodyProps = {
  item: Review;
};

const PostCardBody: FC<PostCardBodyProps> = ({ item }) => {
  const { pictures } = item;
  return (
    <li>
      <div className="bg-gray-600 px-4">
        <Image
          src={pictures[0].picture_url}
          alt="Picture of the author"
          width={500}
          height={500}
        />

        <div className="flex flex-col items-start">
          <h1 className="text-md">{item.review_title}</h1>
          <p className="text-md">${item.review_price}</p>
          <h1 className="text-sm">{item.customer_username}</h1>
        </div>
        <p></p>
      </div>
    </li>
  );
};

export default PostCardBody;
