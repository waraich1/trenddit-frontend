import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as IoLogos from "react-icons/io";
import * as BiLogos from "react-icons/bi";
import { googleLogout } from '@react-oauth/google';

const handleLogout = () => {
  googleLogout();
}

export const SidebarData = [
  {
    title: "Subreddit",
    path: "/subreddit",
    icons: <IoLogos.IoLogoReddit />,
    cName: "side-text",
  },
  {
    title: "Trends",
    path: "/trends",
    icons: <BsIcons.BsGraphUp />,
    cName: "side-text",
  },
  {
    title: "User",
    path: "/user",
    icons: <AiIcons.AiOutlineUser />,
    cName: "side-text",
  },
  {
    title: "Logout",
    path: "/",
    icons: <BiLogos.BiLogOut />,
    cName: "side-text",
    onClick: handleLogout
  },
];
