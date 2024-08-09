import { getAllCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  _id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  quantityInStock?: number;
}

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
];

const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  const cartItems = useAppSelector(getAllCartItems);

  const data: DataType[] = cartItems.map((item, index) => ({
    key: index,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default Cart;
