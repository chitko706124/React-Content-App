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
  const { id } = useParams();
  const { data, isLoading } = useGetContactDetailQuery({ id, token });
  const [deleteContact] = useDeleteContactMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const binContact = content?.contacts.data.filter(
    (item) => item.id === parseInt(id)
  );
  useEffect(() => {
    {
      isLoading ? dispatch(addPath("")) : dispatch(addPath("contactList"));
    }
  });



  const notify = () => toast.error("Content is deleted");

  const deleteHandler = async () => {
    const data = await deleteContact({ id, token });
    if (data?.data?.success) {
      dispatch(addToCart(binContact));
      notify();
      nav("/");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
     
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
