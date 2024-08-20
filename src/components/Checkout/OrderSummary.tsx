import { getAllCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  _id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  quantityInStock?: number;
  total: number;
}

const OrderSummary = () => {
  const cartItems = useAppSelector(getAllCartItems);

  const data: DataType[] = cartItems.map((item, index) => ({
    key: index,
    _id: item._id,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: item.price! * item.quantity!,
  }));

  const totalPayable = data.reduce((sum, item) => sum + item.total, 0);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string) => (
        <img
          // src="https://res.cloudinary.com/dh4n0j5yl/image/upload/v1720090890/2034020005-Suaib.png"
          src={image}
          style={{ width: 70, height: 70 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <div className="flex justify-end  mr-12 font-semibold text-black">
        Total Payable :{" "}
        <span className="text-yellow-600"> {totalPayable} $</span>{" "}
      </div>
    </div>
  );
};

export default OrderSummary;
