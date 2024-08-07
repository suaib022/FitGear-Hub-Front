import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./Admin.routes";
import Home from "@/pages/Homepage/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
