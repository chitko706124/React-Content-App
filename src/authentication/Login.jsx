import React from "react";
import { useForm } from "@mantine/form";

import { PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../services/authSlice";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  // const datas = useSelector((state) => state.auth);

  const notify = () => toast.success("Logined");
  const errorMsg = (msg) => toast.error(`${msg}`);
  const token = Cookies.get("token");


  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value < 5 ? "Your password must be at least 5 cha" : null,
    },
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [login] = useLoginMutation();
  return (
    <div>
      <div className={token ? "hidden" : "mt-5 ml-5 flex gap-3"}>
        <img src="/src/assets/contact.svg" className=" w-[30px]" alt="" />
        <p className=" font-bold text-slate-400 text-2xl">Contacts</p>
      </div>
      <div className="flex   lg:flex-row flex-col-reverse lg:gap-3  items-center justify-evenly mt-10">
        <div className="">
          <img
            src='src/assets/robot.svg'
            alt=""
            className=" w-[600px] h-[40vh] sm:h-[50vh] md:h-[70vh] object-contain transition-all hover:translate-x-5"
          />
        </div>
        <form
          className=" lg:w-[450px]  sm:w-[500px]  w-[calc(100%-10%)] "
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await login(values);
              
              if (data?.success) {
                dispatch(addUser({ user: data?.user, token: data?.token }));
                notify();
                nav(`/welcome`);
              }else {
                errorMsg(data?.message)
              }
            } catch (error) {
              console.log(error);
            }
          })}
        >
          <div className=" bg-white shadow-lg p-5 flex flex-col gap-3">
            <p className=" text-2xl mb-5 font-bold">
              Login Your Account
            </p>
            
           <div>
            <p className=" font-bold text-gray-500">Email</p>
           <TextInput
             
             placeholder="Enter your email"
             description="Put your email in a box "
             {...form.getInputProps("email")}
           />
           </div>
            <div>
              <p className=" font-bold text-gray-500">Password</p>
              <PasswordInput
                placeholder="Enter your password"
                description="Put your password in a box correctly "
                {...form.getInputProps("password")}
              />
            </div>

            <div className=" flex gap-3">
              <p className=" font-bold text-gray-500">
                Doesn't have an account?
              </p>
              <Link className="  text-blue-400 underline" to={`/Register`}>
                Signup
              </Link>
            </div>

            <button className=" bg-blue-700 hover:bg-blue-800 text-white p-2 w-full rounded-md mt-3">
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* <form
        className=" w-[40%] mx-auto my-[160px]"
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          try {
            const { data } = await login(values);

            dispatch(addUser({ user: data?.user, token: data?.token }));

            if (data?.success) {
              notify();
              nav(`/`);
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="relative w-full z-0  mb-6 group ">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            {...form.getInputProps("email")}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            {...form.getInputProps("password")}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
      </form> */}
    </div>
  );
};

export default Login;
