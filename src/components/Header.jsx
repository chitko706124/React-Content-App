import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api/authApi";
import { FcContacts } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { addPath, addSearch } from "../services/search";
import { removeUser } from "../services/authSlice";
import Cookies from "js-cookie";
import Profile from "./Profile";
import { FcFullTrash } from "react-icons/fc";
import { VscSignIn } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";

const Header = () => {
  // const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  // const header = useSelector(state => state.authSlice.header);
  const path = useSelector((state) => state.search.path);
  const binLength = useSelector((state) => state.search.cartItems);

  const { data: search } = addSearch();

  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
  };

  return (
    <>
      <div
        className={
          token
            ? "px-3 py-3 w-full shadow-md flex justify-between items-center"
            : " px-3 py-3 shadow-md flex items-center absolute top-[-30%] "
        }
      >
        <div className=" flex items-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
          >
            <HiMenuAlt2 />
          </button>
          <div className=" flex items-center gap-3 w-auto h-7">
            <img src="/src/assets/contact.svg" className=" w-7 h-8" alt="" />
            <p className=" font-bold text-xl text-slate-400 hidden md:block">
              Contacts
            </p>

            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => dispatch(addSearch(e.target.value))}
                  id="simple-search"
                  className="bg-gray-50 border w-3/4 md:w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>

            </form>
          </div>
        </div>
        <div className=" md:mr-10">
          <Profile />
        </div>
      </div>

      <div
        id="drawer-navigation"
        className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li
              onClick={() => dispatch(addPath(""))}
              className={
                location?.pathname === "/create"
                  ? "bg-blue-500 text-slate-400 rounded-md"
                  : ""
              }
            >
              <Link
                to={"/create"}
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                 src="src/assets/create-contact.svg" alt="" />
                <span className="ml-3">Create Contact</span>
              </Link>
            </li>

            <li
              onClick={() => dispatch(addPath("contactList"))}
              className={
                location?.pathname === "/"
                  ? "bg-blue-500 text-slate-400 rounded-md"
                  : ""
              }
            >
              <Link
                to={"/"}
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="flex items-center rounded-md p-2 text-gray-900   dark:text-white hover:bg-gray-100 `dark:hover:bg-gray-700"
              >
                <FcContacts
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Contacts</span>
              </Link>
            </li>
            <li
              className={
                location?.pathname === "/trash"
                  ? "bg-blue-600 text-slate-400 rounded-md"
                  : ""
              }
            >
              <Link
                to={"/trash"}
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
              >
                <p className="flex items-center p-2 text-gray-900 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FcFullTrash className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Bin</span>
                  <span className="inline-flex items-center  justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {binLength?.length}
                  </span>
                </p>
              </Link>
            </li>

            <li
              onClick={() => {
                dispatch(addPath("")), logoutHandler();
              }}
              className={
                location?.pathname === "/login"
                  ? "bg-blue-500 text-slate-400 rounded-md"
                  : ""
              }
            >
              <Link
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="flex items-center p-2 text-gray-900 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src="src/assets/logout.svg" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="" />
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
            <li
              className={
                location?.pathname === "/register"
                  ? "bg-blue-500 text-slate-400 rounded-md"
                  : ""
              }
            >
              <Link
                onClick={() => dispatch(addPath(""))}
                to={"/register"}
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="flex items-center p-2 text-gray-900 rounded-md dark:text-white hover:bg-gray-100 `dark:hover:bg-gray-700"
              >
                <img src="src/assets/signup.svg" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="" />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
