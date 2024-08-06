import CreateProduct from "@/pages/admin/CreateProduct";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageProducts from "@/pages/admin/ManageProducts";
import Product from "@/pages/product/Product";
import AboutUs from "@/pages/about/aboutUs";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: <AdminDashboard /> },
  { name: "Products", path: "products", element: <Product /> },
  {
    name: "Product Management",
    children: [
      {
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        name: "Manage Products",
        path: "manage-products",
        element: <ManageProducts />,
      },
    ],
  },
  {
    name: "About Us",
    element: <AboutUs />,
    path: "about-us",
  },
];
