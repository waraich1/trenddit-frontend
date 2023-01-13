import React from 'react';
import * as FaIcons from  'react-icons/fa';
import * as AiIcons from  'react-icons/ai';
import * as IoIcons from  'react-icons/io';
import * as BsIcons from  'react-icons/bs';
import * as IoLogos from  'react-icons/io';
import * as BiLogos from  'react-icons/bi';

export const SidebarData = [
    {
        title: "Subreddit",
        path: "/",
        icons: <IoLogos.IoLogoReddit />,
        cName: "side-text"
    },
    {
        title: "Trends",
        path: "/trends",
        icons: <BsIcons.BsGraphUp />,
        cName: "side-text"
    },
    {
        title: "User",
        path: "/user",
        icons: <AiIcons.AiOutlineUser />,
        cName: "side-text"
    },
    {
        title: "Logout",
        path: "/logout",
        icons: <BiLogos.BiLogOut />,
        cName: "side-text"
    }
    
]
