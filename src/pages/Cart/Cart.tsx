import {
  deleteCartItems,
  getAllCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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
  const [selectedItems, setSelectedItems] = useState<DataType[]>([]);
  const [showMultipleDeleteButton, setShowMultipleDeleteButton] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

    const items = data.filter((item) => newSelectedRowKeys.includes(item.key));
    setSelectedItems(items);

    if (items.length > 1) {
      setShowMultipleDeleteButton(true);
    } else {
      setShowMultipleDeleteButton(false);
    }
  };

  console.log({ selectedItems });

  // actions
  const handleDeleteOne = (key: React.Key) => {
    setLoading(true);
    const selectedOne: DataType = data.find((item) => item.key === key);

    console.log("selected", selectedOne);

    if (selectedOne) {
      dispatch(deleteCartItems({ selectedItems: [selectedOne] }));
    }

    setLoading(false);

    setSelectedItems([]);
    console.log({ selectedItems });
  };

  console.log({ loading });

  const handleDeleteMultiple = () => {
    if (selectedItems.length > 0) {
      dispatch(deleteCartItems({ selectedItems }));
      setSelectedRowKeys([]);
      setSelectedItems([]);
      setShowMultipleDeleteButton(false);
    }
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
          {loading ? (
            "Deleting..."
          ) : (
            <RiDeleteBin6Fill className="w-full h-full" />
          )}
        </Button>
      ),
    },
  ];

  return (
    <div>
      {showMultipleDeleteButton ? (
        <Button
          onClick={handleDeleteMultiple}
          className="bg-red-600 text-white hover:bg-rose-600"
        >
          Delete Selected
        </Button>
      ) : (
        ""
      )}
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      {cartItems.length ? (
        <div className="flex justify-end mt-6">
          <Button
            onClick={() => navigate("/checkout")}
            className="w-36 h-10 font-semibold bg-rose-600 text-white hover:bg-red-600"
          >
            Checkout
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
