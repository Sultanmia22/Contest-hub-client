import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [

    ]
  },
]);

export default router