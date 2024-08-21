import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderComponent from "./Header";
import Footer from "../Homepage/Footer";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getAllCartItems } from "@/redux/features/cart/cartSlice";

interface DataType {
  key: React.Key;
  _id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  quantityInStock?: number;
}

const { Content } = Layout;

const MainLayout = () => {
  const [category, setCategory] = useState([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<DataType[]>([]);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);

  const cartItems = useAppSelector(getAllCartItems);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";

    setPendingNavigation(() => () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    if (cartItems.length === 0) return;
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

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
            <Outlet
              context={{
                category,
                setCategory,
                checkedList,
                setCheckedList,
                selectedCartItems,
                setSelectedCartItems,
              }}
            />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
