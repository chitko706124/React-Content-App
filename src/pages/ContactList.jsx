import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useGetContentQuery } from "../services/api/contentApi";
import { useDispatch, useSelector } from "react-redux";
import { addPath, addUser } from "../services/search";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useElementSize } from "@mantine/hooks";
import Noresult from "./Noresult";
// import Welcome from "../authentication/Welcome";
// import { data } from "autoprefixer";
// import Header from "../components/Header";

const ContactList = () => {
  const token = Cookies.get("token");
  const user = JSON?.parse(Cookies.get("user"));
  const { data: content, isLoading } = useGetContentQuery(token);
  const cartItems = useSelector((state) => state.search.cartItems);
  console.log(cartItems);
  // console.log(content?.contacts.data);
  const search = useSelector((state) => state.search.search);
  // const path = useSelector((state) => state.path.path);
  const dispatch = useDispatch();

  // function renderContent() {
  // dispatch()
  // }

  useEffect(() => {
    dispatch(addUser(user));
  });

  useEffect(() => {
    {
      isLoading ? dispatch(addPath("")) : dispatch(addPath("contactList"));
    }
  });

  const filtersearch = content?.contacts.data.filter((item) => {
    return item.name.toLowerCase().includes(search);
  });

  // if (
  //   content?.contacts.data.map((item) =>
  //     item.name.toLowerCase() !== search
  //   ) &&
  //   search !== ""
  // ) {
  //   return <Noresult />;
  // }

  // if(content?.contacts.data.find(item => item.name.toLowerCase()  ))
  // if (filtersearch?.length === 0 && search.length > 0) {
  //   return <Noresult />;
  // } else

  if (content?.contacts.data.length === 0) {
    return (
      <div className=" flex flex-col justify-center align-middle items-center h-96">
        <div className="  px-6 py-4">
          <p className=" text-gray-500  rounded-md mb-5 text-3xl md:text-5xl">
            Contact is Empty!
          </p>
        </div>
        <Link to={"/create"}>
          <button className=" bg-blue-600 text-slate-100 px-3 py-2 rounded-md">
            Create Contact
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex items-center justify-center ">
          <div className="w-[800px] my-20 relative overflow-x-auto shadow-md sm:rounded-lg">
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
                {content?.contacts.data
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
                        <td className="px-6 py-4">
                          {item?.address.substring(0, 15)}
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/detail/${item?.id}`}>
                            <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              Detail
                            </p>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {filtersearch?.length === 0 && search.length > 0 && <Noresult />}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactList;
