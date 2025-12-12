import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboradLayouts from "../Layouts/DashboardLayouts/DashboradLayouts";
import AddContest from "../Pages/Dashboard/AddContest/AddContest";
import MyContest from "../Pages/Dashboard/MyContest/MyContest";
import EditContest from "../Pages/Dashboard/EditContest/EditContest";
import ManageUser from "../Pages/Dashboard/AdminPage/ManageUser/ManageUser";
import ManageContest from "../Pages/Dashboard/AdminPage/ManageContest/ManageContest";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import MyParticipated from "../Pages/Dashboard/UserPage/MyParticipated/MyParticipated";
import WinningContest from "../Pages/Dashboard/UserPage/WinningContest/WinningContest";
import AdminRoutes from "./AdminRoutes";
import CreatorRoutes from "./CreatorRoutes";
import PrivetRoutes from "./PrivetRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
      },

      {
        path: '/all-contest',
        element: <AllContest/>
      },

      {
        path: '/contest/details/:detailsId',
        element: <ContestDetails/>         
      }
    ]
  },

  {
    path: '/',
    element: <AuthLayouts/>,
    children: [
      {
        path: 'login',
        element: <Login/>,
      },

      {
        path: 'register',
        element: <Register/>
      }
    ]
  },

  {
    path: 'dashboard',
    element: <DashboradLayouts/>,
    children:[
      {
        path: 'add-contest',
        element: <CreatorRoutes>
          <AddContest/>
        </CreatorRoutes>
      },

      {
        path: 'my-contest',
        element: <CreatorRoutes>
          <MyContest/>
        </CreatorRoutes>
      },

      {
        path: '/dashboard/edit-cotest/:id',
        element: <CreatorRoutes>
          <EditContest/>
        </CreatorRoutes>
      },

      {
        path: 'manage_users',
        element: <AdminRoutes>
          <ManageUser/>
        </AdminRoutes>
      },

      {
        path: 'manage-contests',
        element: <AdminRoutes>
          <ManageContest/>
        </AdminRoutes>
      },

      {
        path: 'my_participated_contests',
        element: <PrivetRoutes>
          <MyParticipated/>
        </PrivetRoutes>
      },

      {
        path: 'my_winning_contests',
        element: <PrivetRoutes>
          <WinningContest/>
        </PrivetRoutes>
      }
    ]
  }
]);

export default router