/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteCartItems,
  getAllCartItems,
  updateCartQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Flex, Input, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate, useOutletContext } from "react-router-dom";
import img from "../../assets/Result/empty_cart.png";
import { Space } from "antd";
import Swal from "sweetalert2";
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import { LoadingOutlined } from "@ant-design/icons";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  _id?: string | null;
  name: string | null;
  price: number | null;
  totalPrice: number | null;
  image: string | null;
  quantity: number | null;
  quantityInStock?: number | null;
}

const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showMultipleDeleteButton, setShowMultipleDeleteButton] =
    useState(false);

  const { selectedCartItems, setSelectedCartItems, setDisabledCartButtons } =
    useOutletContext<any>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Refs to store previous values
  const prevCartItemsRef = useRef<any[]>([]);

  // get the existing products in DB and cart
  const cartItems = useAppSelector(getAllCartItems);
  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetallProductsQuery({ limit: 5000 });

  console.log({ cartItems });

  // set the cart items in table data
  const data: DataType[] = cartItems.map((item, index) => ({
    key: index,
    _id: item._id ?? null,
    image: item.image ?? null,
    name: item.name ?? null,
    quantity: item.quantity ?? null,
    quantityInStock: item.quantityInStock ?? null,
    price: item.price ?? null,
    totalPrice: item.totalPrice ?? null,
  }));

  // synchronize selectedRowKeys with selectedCartItems
  useEffect(() => {
    if (cartItems !== prevCartItemsRef.current) {
      const selectedKeys = data
        .filter((item) =>
          selectedCartItems.some((selected: any) => selected._id === item._id)
        )
        .map((item) => item.key);

      setSelectedRowKeys(selectedKeys);
      prevCartItemsRef.current = cartItems;
    }
  }, [cartItems, selectedCartItems, data]);

  // manage addToCart button status for each product
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
          if (
            (existingCartItem?.quantity as number) >=
            (existingCartItem?.quantityInStock as number)
          ) {
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

  // handle item selection in table
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const items = data.filter((item) => newSelectedRowKeys.includes(item.key));
    setSelectedCartItems(items);

    setShowMultipleDeleteButton(items.length > 1);
  };

  // actions
  // handle delete single cart item
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
        const selectedOne = data.find((item) => item.key === key) as DataType;

        if (selectedOne) {
          dispatch(deleteCartItems({ selectedCartItems: [selectedOne] }));
        }

        setSelectedCartItems([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected item removed from your cart!",
          icon: "success",
        });
      }
    });
  };

  // handle delete multiple cart items at once
  const handleDeleteMultiple = () => {
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
        if (selectedCartItems.length > 0) {
          dispatch(deleteCartItems({ selectedCartItems }));
          setSelectedRowKeys([]);
          setSelectedCartItems([]);
          setShowMultipleDeleteButton(false);
        }
        setSelectedCartItems([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected items removed from your cart!",
          icon: "success",
        });
      }
    });
  };

  // handle instant quantity change for each cart item
  const handleQuantityChange = (value: number, key: React.Key) => {
    const updatedItem = data.find((item) => item.key === key);

    if (updatedItem) {
      const maxQuantity = updatedItem.quantityInStock || 100;
      const newQuantity = Math.min(value, maxQuantity);

      dispatch(
        updateCartQuantity({
          updatedQuantity: newQuantity,
          updatedQuantityInStock: updatedItem.quantityInStock,
          _id: updatedItem._id,
          price: updatedItem.price,
        })
      );
    }
  };

  // navigation
  // navigate to product details page
  const handleGoToDetails = async (key: React.Key) => {
    const clickedOne = data.find((item) => item.key === key);

    navigate(`/products/${clickedOne!._id}`);
  };

  // row and column
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  console.log({ selectedCartItems });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string, record) => (
        <img
          className="transition-transform transform hover:scale-105"
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
      render: (_, record) => (
        <Space>
          <Button
            className="bg-white text-black border border-slate-300 h-8 hover:bg-rose-500 hover:text-white"
            onClick={() =>
              handleQuantityChange(
                (record.quantity ?? 1) - 1 > 0 ? (record.quantity ?? 1) - 1 : 1,
                record.key
              )
            }
          >
            -
          </Button>
          <Input
            className="w-12 text-center"
            min={0}
            max={Number(record.quantityInStock)}
            value={record.quantity ?? 0}
            onChange={(e) =>
              handleQuantityChange(Number(e.target.value), record.key)
            }
          />
          <Button
            className="h-8 bg-white text-black border border-slate-300 hover:bg-rose-500 hover:text-white"
            onClick={() =>
              handleQuantityChange((record.quantity ?? 0) + 1, record.key)
            }
            disabled={(record.quantity ?? 0) === (record.quantityInStock ?? 0)}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <p className="text-orange-600 font-semibold">{price}</p>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      render: (totalPrice) => (
        <p className="text-orange-600 font-semibold">{totalPrice}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          className="w-12 bg-rose-500"
          onClick={() => handleDeleteOne(record.key)}
        >
          <RiDeleteBin6Fill className="w-full h-full" />
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
        <div className="flex justify-center justify-centers flex-col">
          <div className="flex">
            <img
              src={img}
              className="mx-auto mt-8 mb-4"
              style={{ maxWidth: 350 }}
              alt=""
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p>Looks like you haven't made order yet.</p>
            <p
              onClick={() => navigate("/products")}
              className="text-blue-600 hover:cursor-pointer hover:underline font-semibold"
            >
              Continue to Shopping
            </p>
          </div>
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
