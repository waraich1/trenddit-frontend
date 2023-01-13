import './Components/Sidebar/Sidebar.css'
import Sidebar from './Components/Sidebar/Sidebar.js'
import {
  createBrowserRouter,
  Outlet
} from "react-router-dom";
import Subreddit from "./Pages/Subreddit"
import Trends from "./Pages/Trends"
import User from "./Pages/User"



const SidebarLayout = () => (
  <>
  <Sidebar />
  
  <Outlet />
  </>
)

  const router = createBrowserRouter([
  {
    element: <SidebarLayout  />,
    children: [
      {
      path: "/",
      element: <Subreddit />,
    },
    {
      path: "trends",
      element: <Trends />,
    },
    {
      path: "user",
      element: <User />,
    },
  ]

  }
  
]);

export default router;

