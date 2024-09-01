import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { allPaths } from "@/routes/allRoutes";
const { Sider } = Layout;

const Sidebar = () => {
  const sidebarItems = sidebarItemsGenerator(allPaths);

  return (
    <Sider
      className="h-full"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={() => {}}
      onCollapse={() => {}}
    >
      <div
        style={{
          color: "white",

          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink to={"/"}>
          <img src={logo}></img>
        </NavLink>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
