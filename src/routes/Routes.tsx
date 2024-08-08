import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./Admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
]);

export default router;
