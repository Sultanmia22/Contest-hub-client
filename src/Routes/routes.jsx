import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboradLayouts from "../Layouts/DashboardLayouts/DashboradLayouts";
import AddContest from "../Pages/Dashboard/AddContest/AddContest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
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
        element: <AddContest/>
      }
    ]
  }
]);

export default router