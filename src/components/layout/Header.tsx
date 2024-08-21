import { Layout } from "antd";
import logo from "../../assets/logo.png";
import { FaOpencart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header>
      <div className="flex items-center">
        <div className="text-yellow-400 flex justify-start w-1/2 lg:w-1/3">
          <NavLink to={"/"}>
            <img src={logo} className="w-28 " alt="" />
          </NavLink>
        </div>
        <div className="lg:block text-white hidden w-1/3">
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
          <NavLink to={"/cart"}>
            <FaOpencart className="text-blue-500  w-12" />
          </NavLink>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
