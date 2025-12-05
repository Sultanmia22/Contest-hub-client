import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [

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
  }
]);

export default router