import {
  deleteOneCartItem,
  getAllCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { RiDeleteBin6Fill } from "react-icons/ri";

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

const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useAppDispatch();

  let selectedItems;

  const cartItems = useAppSelector(getAllCartItems);

  const data: DataType[] = cartItems.map((item, index) => ({
    key: index,
    _id: item._id,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    selectedItems = data.filter((item) =>
      newSelectedRowKeys.includes(item.key)
    );
    console.log("Selected :", selectedItems);
  };

  // actions
  const handleDeleteOne = (key: React.Key) => {
    console.log("key num :", key);

    const selectedOne = data.find((item) => item.key === key);

    console.log("selected", selectedOne);

    dispatch(deleteOneCartItem(selectedOne));
  };

  // row and column
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

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
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          className="w-12"
          type="primary"
          danger
          onClick={() => handleDeleteOne(record.key)}
        >
          <RiDeleteBin6Fill className="w-full h-full" />
        </Button>
      ),
    },
  ];

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default Cart;
