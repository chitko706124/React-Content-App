/* eslint-disable no-unused-vars */
// import { TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEditContactMutation,
  useGetContactDetailQuery,
} from "../services/api/contentApi";
import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";

const EditContact = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const nav = useNavigate();
  const { data, isLoading } = useGetContactDetailQuery({ id, token });
  const [editContact] = useEditContactMutation(token);

  const notify = () => toast.success("Contact is updated");

  const form = useForm({
    initialValues: {
      name: data?.contact?.name,
      email: data?.contact?.email,
      phone: data?.contact?.phone,
      address: data?.contact?.address,
    },
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="  flex justify-center items-center mt-20">
          <form
            onSubmit={form.onSubmit(async (values) => {
              const { data } = await editContact({
                token,
                content: values,
                id,
              });
              if (data?.success) {
                notify();
                nav("/");
              }
              console.log(data);
            })}
            className=" w-96 p-7 flex flex-col gap-10 shadow-lg "
          >
            <h2 className=" text-2xl font-bold">Edit Your Contact</h2>
            <TextInput
              placeholder="Enter Your Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Enter Your Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Enter Your Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              placeholder="Enter Your Address"
              {...form.getInputProps("address")}
            />
            <div className=" flex items-center justify-between gap-3 ">
              <div className="w-1/2">
                <Link to={`/detail/${id}`} className="">
                  <button className=" text-blue-500 text-center w-full border outline outline-offset-2 outline-1 rounded-sm">
                    Cancel
                  </button>
                </Link>
              </div>

              <button className=" bg-blue-500 text-white w-1/2 py-1 rounded-sm hover:bg-blue-400">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditContact;
