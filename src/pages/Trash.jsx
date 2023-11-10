import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPath, emptyToCart, singleDelete } from "../services/search";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCreateContentMutation } from "../services/api/contentApi";
import { useNavigate } from "react-router-dom";
import { MdRestorePage, MdDelete } from "react-icons/md";
import Cookies from "js-cookie";

const Trash = () => {
  const dispatch = useDispatch();

  // const [value,setValue] = useState([]);

  const binItems = useSelector((state) => state.search.cartItems);
  const search = useSelector((state) => state.search.search);

  const nav = useNavigate();
  const notify = () => toast.error("Trash is Emptied");
  const restoreMsg = () => toast.success("Trash is restored");
  const singleDeleMsg = () => toast.error("Trash item is deleted");

  const [createContent] = useCreateContentMutation();
  const token = Cookies.get("token");

  const restore = async (value, token) => {
    const { data } = await createContent({ token, content: value });
    if (data?.success) {
      restoreMsg();
      nav("/");
    }
  };

  useEffect(() => {
    dispatch(addPath("contactList"));
  });

  // if(binItems.length === 0){
  // return {
  //   <div className=" flex flex-col justify-center align-middle items-center h-96">
  //   <div className="  px-6 py-4">
  //     <p className=" text-gray-500  rounded-md mb-5 text-3xl md:text-5xl">
  //       Trash is Empty
  //     </p>
  //   </div>
  //   <Link to={"/"}>
  //     <button className=" bg-blue-600 text-slate-100 px-3 py-2 rounded-md">
  //       Go Back
  //     </button>
  //   </Link>
  // </div>
  // }

  if (binItems.length === 0) {
    return (
      <div className=" flex flex-col justify-center align-middle items-center h-96">
        <div className="  px-6 py-4">
          <p className=" text-gray-500  rounded-md mb-5 text-3xl md:text-5xl">
            Trash is Empty
          </p>
        </div>
        <Link to={"/"}>
          <button className=" bg-blue-600 text-slate-100 px-3 py-2 rounded-md">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  // }

  return (
    <div className=" flex justify-center ">
      <div className=" my-20 relative overflow-x-auto shadow-md sm:rounded-lg w-[800px]">
        <div className=" flex justify-end w-full">
          <button
            onClick={() => dispatch(emptyToCart(), notify())}
            className=" bg-red-600 text-slate-100 rounded-md px-3 py-2 my-5"
          >
            Trash All
          </button>
        </div>
        <div className=" ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {binItems
                .filter((item) => {
                  if (search === "") {
                    return item;
                  } else {
                    return item.name.toLowerCase().includes(search);
                  }
                })
                .map((item) => {
                  return (
                    <tr
                      key={item?.id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{item?.name}</td>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">{item?.phone}</td>
                      <td className="px-6 py-4">{item?.address}</td>
                      <td className="px-6 py-4">
                        <div>
                          <button
                            onClick={() => {
                              restore(
                                {
                                  name: item?.name,
                                  email: item?.email,
                                  phone: item?.phone,
                                  address: item?.address,
                                },
                                token
                              ),
                                dispatch(singleDelete(item?.id));
                            }}
                            className="font-medium text-green-600 dark:text-red-500 hover:underline"
                          >
                            <MdRestorePage size={30} />
                          </button>
                          <button
                            onClick={() => {
                              dispatch(singleDelete(item?.id)), singleDeleMsg();
                            }}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            <MdDelete size={30} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* // </div>
          // <div className=" flex flex-col justify-center align-middle items-center h-96">
          //   <div className="  px-6 py-4">
          //     <p className=" text-gray-500  rounded-md mb-5 text-3xl md:text-5xl">
          //       Trash is Empty
          //     </p>
          //   </div>
          //   <Link to={"/"}>
          //     <button className=" bg-blue-600 text-slate-100 px-3 py-2 rounded-md">
          //       Go Back
          //     </button>
          //   </Link>
          // </div> */}
      </div>
    </div>
  );
};

export default Trash;
