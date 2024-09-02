/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";

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
  const { selectedCartItems } = useOutletContext<any>();
  const navigate = useNavigate();

  const data: DataType[] = selectedCartItems.map((item: any, index: any) => ({
    key: index,
    _id: item._id,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: item.price! * item.quantity!,
  }));

  const handleGoToDetails = async (key: React.Key) => {
    const clickedOne = data.find((item) => item.key === key);

    navigate(`/products/${clickedOne!._id}`);
  };

  const totalPayable = data.reduce((sum, item) => sum + item.total, 0);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string, record) => (
        <img
          className=" transition-transform transform hover:scale-105 "
          onClick={() => handleGoToDetails(record.key)}
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
        Total Payableㅤ:ㅤ
        <span className="text-orange-600 font-semibold">
          {totalPayable} $
        </span>{" "}
      </div>
    </div>
  );
};

export default OrderSummary;
