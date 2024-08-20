import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderComponent from "./Header";
import Footer from "../Homepage/Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
