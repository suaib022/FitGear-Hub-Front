import {
  deleteCartItems,
  getAllCartItems,
  updateCartQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Flex, Input, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate, useOutletContext } from "react-router-dom";
import img from "../../assets/Result/no-data-found.png";
import { Space } from "antd";
import Swal from "sweetalert2";
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import { LoadingOutlined } from "@ant-design/icons";

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

  const {
    selectedCartItems,
    setSelectedCartItems,
    disabledCartButtons,
    setDisabledCartButtons,
  } = useOutletContext();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(getAllCartItems);
  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetallProductsQuery({ limit: 5000 });

  const data: DataType[] = cartItems.map((item, index) => ({
    key: index,
    _id: item._id,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    quantityInStock: item.quantityInStock,
    price: item.price,
  }));

  useEffect(() => {
    if (
      !isAllProductsLoading &&
      !isAllProductsError &&
      allProducts &&
      cartItems
    ) {
      let disabledButtons = [];

      for (let i = 0; i < allProducts.data?.length; i++) {
        const product = allProducts.data[i];
        const existingCartItem = cartItems.find(
          (item) => item._id === product?._id
        );

        if (existingCartItem) {
          if (existingCartItem?.quantity >= existingCartItem?.quantityInStock) {
            disabledButtons.push({ [product._id]: true });
          } else {
            disabledButtons.push({ [product._id]: false });
          }
        } else if (product?.quantity === 0) {
          disabledButtons.push({ [product._id]: true });
        } else {
          disabledButtons.push({ [product._id]: false });
        }
      }

      setDisabledCartButtons(disabledButtons);
    }
  }, [
    cartItems,
    allProducts,
    isAllProductsLoading,
    isAllProductsError,
    setDisabledCartButtons,
  ]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const items = data.filter((item) => newSelectedRowKeys.includes(item.key));
    setSelectedCartItems(items);

    setShowMultipleDeleteButton(items.length > 1);
  };

  const handleDeleteOne = (key: React.Key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const selectedOne: DataType = data.find((item) => item.key === key);

        if (selectedOne) {
          dispatch(deleteCartItems({ selectedCartItems: [selectedOne] }));
        }

        setLoading(false);
        setSelectedCartItems([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected item removed from your cart!",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteMultiple = () => {
    if (selectedCartItems.length > 0) {
      dispatch(deleteCartItems({ selectedCartItems }));
      setSelectedRowKeys([]);
      setSelectedCartItems([]);
      setShowMultipleDeleteButton(false);
    }
  };

  const handleQuantityChange = (value: number, key: React.Key) => {
    const updatedItem = data.find((item) => item.key === key);

    if (updatedItem) {
      const maxQuantity = updatedItem.quantityInStock || 100;
      const newQuantity = Math.min(value, maxQuantity);

      const updatedItemWithNewQuantity = {
        ...updatedItem,
        quantity: newQuantity,
        quantityInStock: updatedItem.quantityInStock,
      };

      dispatch(
        updateCartQuantity({
          updatedQuantity: newQuantity,
          updatedQuantityInStock: updatedItem.quantityInStock,
          _id: updatedItem._id,
        })
      );
    }
  };

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
        <img src={image} style={{ width: 70, height: 70 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <Space>
          <Button
            className="bg-white text-black border border-slate-300 h-8 hover:bg-rose-500 hover:text-white"
            onClick={() =>
              handleQuantityChange(
                record.quantity - 1 > 0 ? record.quantity - 1 : 1,
                record.key
              )
            }
          >
            -
          </Button>
          <Input
            className="w-12 text-center"
            min={0}
            max={record.quantityInStock}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(value, record.key)}
          />
          <Button
            className="h-8 bg-white text-black border border-slate-300 hover:bg-rose-500 hover:text-white"
            onClick={() =>
              handleQuantityChange(record.quantity + 1, record.key)
            }
            disabled={record.quantity === record.quantityInStock}
          >
            +
          </Button>
        </Space>
      ),
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

  if (isAllProductsLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="flex justify-center">
          <img src={img} style={{ maxWidth: 350 }} alt="" />
        </div>
      ) : (
        <div>
          {showMultipleDeleteButton && (
            <Button
              onClick={handleDeleteMultiple}
              className="bg-red-600 text-white hover:bg-rose-600"
            >
              Delete Selected
            </Button>
          )}
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
          {cartItems.length > 0 && (
            <div className="flex justify-end mt-6">
              <Button
                disabled={selectedCartItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="w-36 h-10 font-semibold bg-blue-600 text-white hover:bg-rose-600"
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
