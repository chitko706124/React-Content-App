// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Menu } from "@mantine/core";
import { Button } from "@mantine/core";
import {
  useDeleteContactMutation,
  useGetContactDetailQuery,
  useGetContentQuery,
} from "../services/api/contentApi";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addPath, addToCart } from "../services/search";
import { GoThreeBars } from "react-icons/go";
import dateFormat, { masks } from "dateformat";

const ContactDetail = () => {
  const token = Cookies.get("token");
  const { data: content } = useGetContentQuery(token);
  console.log(content?.contacts.data);
  const { id } = useParams();
  const { data, isLoading } = useGetContactDetailQuery({ id, token });
  const [deleteContact] = useDeleteContactMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const binContact = content?.contacts.data.filter(
    (item) => item.id === parseInt(id)
  );
  console.log(binContact);
  useEffect(() => {
    {
      isLoading ? dispatch(addPath("")) : dispatch(addPath("contactList"));
    }
  });

  // const bin = JSON?.parse(Cookies.get("bin"));
  // console.log(bin);

  const notify = () => toast.error("Content is deleted");

  const deleteHandler = async () => {
    const data = await deleteContact({ id, token });
    console.log(data);
    // dispatch(addBin(data));
    if (data?.data?.success) {
      //  dispatch(addBin(binContact));
      dispatch(addToCart(binContact));
      notify();
      nav("/");
    }
    // console.log(data);
  };

  //   console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        // <div>
        //   <div className="my-5 grid grid-cols-12 grid-rows-4 gap-1">
        //     <div className=" row-start-1 row-end-2 col-start-2 lg:col-start-2 ">
        //       <Link to={"/"}>
        //         <button>
        //           <AiOutlineLeft className=" text-2xl" />
        //         </button>
        //       </Link>
        //     </div>
        //     <div className="col-start-5 col-span-4 md:col-start-2 row-span-4 md:col-span-4 md:row-span-4 flex flex-wrap md:flex-nowrap justify-center align-middle items-center gap-10">
        //       {/* <img
        //         src={
        //           data?.contact?.photo === null
        //             ? "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
        //             : data?.contact?.photo
        //         }
        //         width={"150px"}
        //         className=" rounded-full"
        //       />
        //       <div className=" flex flex-col">
        //         <p className=" text-2xl">{data?.contact?.name}</p>
        //         <p className=" text-md text-gray-500">{data?.contact?.phone}</p>
        //       </div> */}
        //     </div>
        //     <div className="col-start-11 col-span-2 row-start-1 row-span-2 md:col-start-11 md:col-span-4 md:row-start-1 md:row-span-2">
        //       <Menu width={150}>
        //         <Menu.Target>
        //           <Button variant="">
        //             <BsThreeDotsVertical size={20} />
        //           </Button>
        //         </Menu.Target>

        //         <Menu.Dropdown>
        //           <Link to={`/edit/${id}`}>
        //             <Menu.Item target="_blank">
        //               <p className=" cursor-pointer text-center">Edit User</p>
        //             </Menu.Item>
        //           </Link>

        //           <Menu.Item>
        //             <p
        //               className=" cursor-pointer text-red-500 text-center"
        //               onClick={() => deleteHandler(id)}
        //             >
        //               Delete User
        //             </p>
        //           </Menu.Item>
        //         </Menu.Dropdown>
        //       </Menu>
        //     </div>
        //   </div>

        //   {/* <div className=" grid grid-cols-12 gap-0 my-5"> */}
        //     {/* <div className=" col-start-2 col-span-10 md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-3 border-2 border-black rounded-lg p-5">
        //       <h4 className=" text-lg">User Details</h4>
        //       <hr />
        //       <p>
        //         Email :{" "}
        //         {data?.contact?.email === null
        //           ? "example@gmail.com"
        //           : data?.contact?.email}
        //       </p>
        //       <p>Phone : {data?.contact?.phone}</p>
        //       <p>
        //         Address :{" "}
        //         {data?.contact?.address === null
        //           ? "Bahan TownShip"
        //           : data?.contact?.address}
        //       </p>
        //     </div> */}
        //   {/* </div> */}
        // </div>
        <div className=" flex justify-center my-20">
          <div className="max-w-sm flex gap-3 flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className=" flex justify-end">
              <Menu width={150}>
                <Menu.Target>
                  <Button variant="" className=" mb-[-60px] mt-3 text-blue-800">
                    <BsThreeDots size={20} />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link to={`/edit/${id}`}>
                    <Menu.Item target="_blank">
                      <p className=" cursor-pointer text-center">Edit User</p>
                    </Menu.Item>
                  </Link>

                  <Menu.Item>
                    <p
                      className=" cursor-pointer text-red-500 text-center"
                      onClick={() => deleteHandler(id)}
                    >
                      Delete User
                    </p>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

            <a href="#">
              <div className=" flex justify-center mt-6">
                {/* {data?.contact?.photo === null ? (
                  <div className=" text-6xl font-bold bg-orange-400 text-white rounded-full p-8">{data?.contact?.name.substring(0, 1)}</div>
                ) : (
                  <div>{data?.contact?.photo}</div>
                )} */}

                <img
                  src={
                    data?.contact?.photo === null
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ63Ywv0otFKgLAyw54q1tvSVUi5u3NGSorw&usqp=CAU"
                      : data?.contact?.photo
                  }
                  width={"150px"}
                  className=" rounded-full"
                />
              </div>
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                  {data?.contact?.name}
                </h5>
              </a>
              <div className="mt-5 mb-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <span className=" text-xl">Phone</span> -{" "}
                  {data?.contact?.phone}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <span className=" text-lg">Email</span> -{" "}
                  {data?.contact?.email}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <span className=" text-lg">Address</span> -{" "}
                  {data?.contact?.address}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <span className=" text-lg">Created At</span> -{" "}
                  {dateFormat(data?.contact?.created_at, "dd mmm yyyy")}
                  {" at "}
                  {dateFormat(data?.contact?.created_at, "h:MM TT")}
                </p>
              </div>
              {/* <div className=" flex items-center gap-3">
                <Link
                  to={`/edit/${id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <button
                  onClick={() => deleteHandler(id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div> */}
              <Link to={"/"}>
                <Button
                  className=" w-full"
                  variant="outline"
                  color="blue"
                  size="md"
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetail;
