import React, { useReducer } from "react";
import { PostFormActions } from "../../../@types/userPost";
import { PostReducer } from "../../reducer/postReducer";
import CreatableSelect from "react-select/creatable";
import Image from "../../api/Image";
import axios from "axios";
import { routes } from "../../../@types/applicationRoutes";

const initialPostArg = {
  title: "",
  price: 0.0,
  description: "",
  photos: [],
};

const UserPostForm = () => {
  const [formData, dispatch] = useReducer(PostReducer, initialPostArg);
  const {
    MODIFY_TITLE,
    MODIFY_DESCRIPTION,
    MODIFY_PRICE,
    ADD_IMAGE,
  } = PostFormActions;

  const handleFileSubmit = (e) => {
    const photo = e.target.files[0];
    if (photo.type !== "image/png") {
      // TODO: Add Warning Toast
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
        const { originalUrl } = data;
        console.log(originalUrl);
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
            type="number"
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
              console.log(e);
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

        {/* <div className="sm:col-span-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Relevant Tags
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Add some tags to your post so others can find it more easily!
                (Eg. Cooking, Vegetables, Chinese)
              </p>
               TODO : Fix Up Tags
               <CreatableSelect
                classNameName="mt-4"
                isMulti
                options={options}
                onChange={handleOptionChange}
                onInputChange={handleInputChange}
              /> 
            </div> 
            */}
        <button
          type="submit"
          className=" items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserPostForm;
