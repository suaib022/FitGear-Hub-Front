import { Layout } from "antd";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import logo from "../../assets/logo.png";
import { FaOpencart } from "react-icons/fa";
import Product from "@/pages/product/Product";
import CreateProduct from "@/pages/admin/CreateProduct";
import ManageProducts from "@/pages/admin/ManageProducts";
import AboutUs from "@/pages/about/aboutUs";
import { NavLink } from "react-router-dom";

const { Header } = Layout;

const headerPaths = [
  { name: "Products", path: "products", element: <Product /> },
  {
    name: "Product Management >",
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

const headerItems = sidebarItemsGenerator(headerPaths);

const HeaderComponent = () => {
  return (
    <Header>
      <div className="flex items-center">
        <div className="text-yellow-400 flex justify-start w-1/2 lg:w-1/3">
          <NavLink to={"/"}>
            <img src={logo} className="w-28 " alt="" />
          </NavLink>
        </div>
        <div className="text-red-500 lg:block hidden border w-1/3">
          <ul className="flex justify-between items-center">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/products"}>Products</NavLink>
            </li>
            <li>
              <NavLink to={"/about-us"}>About Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="w-1/2 lg:w-1/3 justify-end flex ">
          <FaOpencart className="text-blue-500  w-12" />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;

{
  /* <Menu
className="lg:flex top-0 lg:items-center lg:justify-center lg:block hidden"
theme="dark"
mode="horizontal"
items={headerItems}
></Menu> */
}
