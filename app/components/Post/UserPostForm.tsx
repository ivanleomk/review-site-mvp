import React, { useReducer } from "react";
import { PostFormActions } from "../../../@types/userPost";
import { PostReducer } from "../../reducer/postReducer";
import CreatableSelect from "react-select/creatable";
import Image from "../../api/Image";
import axios from "axios";
import { routes } from "../../../@types/applicationRoutes";
import { useMutation } from "@apollo/client";
import ADD_NEW_REVIEW from "../../queries/addReview.graphql";
import { useUsers } from "../../context/UserContext";
import { toast } from "@aws-amplify/ui";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import Auth from "@aws-amplify/auth";

const initialPostArg = {
  title: "",
  price: 0.0,
  description: "",
  photos: [],
  link: "",
};

const UserPostForm = () => {
  const [formData, dispatch] = useReducer(PostReducer, initialPostArg);
  const toast = useToast();
  const router = useRouter();

  const [
    addReview,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_NEW_REVIEW);

  const { user } = useUsers();

  const {
    MODIFY_TITLE,
    MODIFY_DESCRIPTION,
    MODIFY_PRICE,
    ADD_IMAGE,
    MODIFY_LINK,
  } = PostFormActions;

  const handleFileSubmit = (e) => {
    const photo = e.target.files[0];
    if (
      photo.type !== "image/png" &&
      photo.type !== "image/jpg" &&
      photo.type !== "image/jpeg"
    ) {
      // TODO: Add Warning Toast
      toast({
        title: "Error.",
        description: "We only support .png and .jpg at the moment",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    dispatch({
      type: ADD_IMAGE,
      payload: {
        photo,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = formData.photos[0];
    var data = new FormData();
    data.append("file", file);
    data.append("", "");

    Image.post("/", data)
      .then(({ data }) => {
        const { url: picture_url } = data;
        const { userName: customer_username } = user;
        const {
          title: review_title,
          price: review_price,
          description: review_details,
          link: review_link,
        } = formData;
        console.log(picture_url);
        const variables = {
          customer_username,
          review_title,
          review_details,
          review_link,
          review_price,
          picture_url,
        };

        addReview({
          variables,
        })
          .then((res) => {
            console.log(res);
            toast({
              title: "Review Created.",
              description: "Thanks for submitting your new review",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Item
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">What did you buy?</p>

          <input
            id="about"
            name="about"
            type="text"
            className="focus:outline-none p-4 mt-4 border-gray-300 shadow-sm block w-full sm:text-sm  rounded-md"
            value={formData.title}
            onChange={(e) =>
              dispatch({
                type: MODIFY_TITLE,
                payload: { title: e.target.value },
              })
            }
          />
        </div>
        <div className="sm:col-span-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Price
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">How much did it cost?</p>

          <input
            id="about"
            name="about"
            type="number"
            className="focus:outline-none p-4 border-gray-300 shadow-sm block w-full sm:text-sm  rounded-md"
            value={formData.price}
            onChange={(e) => {
              dispatch({
                type: MODIFY_PRICE,
                payload: { price: e.target.value },
              });
            }}
          />
        </div>
        <div className="sm:col-span-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Link To Item
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">Add a Link to the item</p>

          <input
            id="about"
            name="about"
            type="text"
            className="focus:outline-none p-4 mt-4 border-gray-300 shadow-sm block w-full sm:text-sm  rounded-md"
            value={formData.link}
            onChange={(e) =>
              dispatch({
                type: MODIFY_LINK,
                payload: { link: e.target.value },
              })
            }
          />
        </div>
        <div className="sm:col-span-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              What did you think about this Item?
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Let us know what you thought
          </p>

          <textarea
            id="about"
            name="about"
            className="focus:outline-none p-4 border-gray-300 shadow-sm block w-full sm:text-sm  rounded-md h-40 mt-2"
            value={formData.description}
            onChange={(e) => {
              dispatch({
                type: MODIFY_DESCRIPTION,
                payload: { description: e.target.value },
              });
            }}
          />
        </div>

        <div className="sm:col-span-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add a photo
            </h3>
          </div>

          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 ">
            <input
              id="file-upload"
              name="file-upload"
              className="mt-4 focus:outline-none outline-none"
              type="file"
              onChange={handleFileSubmit}
            />
          </label>
        </div>

        <button
          type="submit"
          className="sm:col-span-6 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserPostForm;
