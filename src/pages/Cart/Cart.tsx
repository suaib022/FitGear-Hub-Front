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
import { useNavigate, useOutletContext } from "react-router-dom";
import img from "../../assets/Result/no-data-found.png";

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
  const [showMultipleDeleteButton, setShowMultipleDeleteButton] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const { selectedCartItems, setSelectedCartItems } = useOutletContext();

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
    setSelectedCartItems(items);

    if (items.length > 1) {
      setShowMultipleDeleteButton(true);
    } else {
      setShowMultipleDeleteButton(false);
    }
  };

  console.log({ selectedCartItems });

  // actions
  const handleDeleteOne = (key: React.Key) => {
    setLoading(true);
    const selectedOne: DataType = data.find((item) => item.key === key);

    console.log("selected", selectedOne);

    if (selectedOne) {
      dispatch(deleteCartItems({ selectedCartItems: [selectedOne] }));
    }

    setLoading(false);

    setSelectedCartItems([]);
    console.log({ selectedCartItems });
  };

  console.log({ loading });

  const handleDeleteMultiple = () => {
    if (selectedCartItems.length > 0) {
      dispatch(deleteCartItems({ selectedCartItems }));
      setSelectedRowKeys([]);
      setSelectedCartItems([]);
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
          className="w-12 bg-rose-500"
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
      {cartItems.length === 0 ? (
        <div className="flex justify-center">
          <img src={img} style={{ maxWidth: 350 }} alt="" />
        </div>
      ) : (
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
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
          {cartItems.length ? (
            <div className="flex justify-end mt-6">
              <Button
                disabled={selectedCartItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="w-36 h-10 font-semibold bg-blue-600 text-white hover:bg-rose-600"
              >
                Checkout
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
