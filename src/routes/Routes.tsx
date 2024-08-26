import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { allPaths } from "./allRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(allPaths),
  },
]);

export default router;
