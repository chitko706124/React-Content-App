import React from "react";
import { Menu, Button, rem } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../services/api/authApi";
import { removeUser } from "../services/authSlice";
import { parse } from "postcss";
// import { useLogoutMutation } from "../feature/Api/authApi";
// import { removeUser } from "../feature/services/authSlice";

const Profile = () => {
  const token = Cookies?.get("token");
  // const user = JSON?.parse(Cookies.get("user"));
  // let user = token ? JSON?parse(Cookies.get("user")) : "" ;
  //   if (token) {
  //     let user = JSON?.parse(Cookies.get("user"));
  //   }

  const user = useSelector((state) => state.search.user);
  console.log(user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
    console.log(data);
  };
  return (
    <div className="  rounded-full">
      <Menu withArrow width={200} shadow="md">
        <Menu.Target>
          <Button className=" bg-blue-700 hover:bg-blue-800 rounded-full p-2">
            <CgProfile className=" text-lg" />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <div className=" flex flex-col">
              <h1>{user?.name}</h1>

              <h1 className=" text-xs">{user?.email}</h1>
            </div>
          </Menu.Item>
          <Link to={"/login"}>
            <Menu.Item>Login with another account</Menu.Item>
          </Link>
          <Menu.Item color="red">
            <button onClick={logoutHandler}>Delete my account</button>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default Profile;
