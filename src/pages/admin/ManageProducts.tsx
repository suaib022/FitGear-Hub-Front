/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiEdit } from "react-icons/fi";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  useDeleteMultipleProductsMutation,
  useDeleteSingleProductMutation,
  useGetallProductsQuery,
} from "@/redux/features/product/productApi";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import img from "../../assets/Result/no-data-found.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteCartItems,
  getAllCartItems,
} from "@/redux/features/cart/cartSlice";
import errorImg from "../../assets/Result/error-404.png";
import Swal from "sweetalert2";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ManageProduct = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showMultipleDeleteButton, setShowMultipleDeleteButton] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let clickedOne: any;

  const [deleteSingleProduct, { isLoading: isDeleteLoading }] =
    useDeleteSingleProductMutation();

  const [deleteMultipleProducts, { isLoading: isDeleteMultipleLoading }] =
    useDeleteMultipleProductsMutation();

  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery({ limit: 5000 });
  const cartItems = useAppSelector(getAllCartItems);

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isError) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  const data: DataType[] = products.data.map((item, index) => ({
    key: index,
    _id: item._id,
    image: item.image,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const items = data.filter((item) => newSelectedRowKeys.includes(item.key));
    setSelectedItems(items);

    if (items.length > 1) {
      setShowMultipleDeleteButton(true);
    } else {
      setShowMultipleDeleteButton(false);
    }
  };

  // actions
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
        clickedOne = data.find((item) => item.key === key);
        const toBeDeletedCartItem = cartItems.find(
          (item) => item._id === clickedOne!._id
        );

        if (toBeDeletedCartItem) {
          dispatch(
            deleteCartItems({ selectedCartItems: [toBeDeletedCartItem] })
          );
          toast.success("Also Deleted from cart !", { duration: 3000 });
        }

        const res = deleteSingleProduct(clickedOne!._id);

        res.then((result) => {
          console.log(result.data);
          if (result.data.success) {
            toast.success("Deleted successfully !", {
              duration: 2000,
            });
            setSelectedItems([]);
            setSelectedRowKeys([]);
          } else {
            toast.error("Something went wrong !", {
              duration: 2000,
            });
          }
        });
      }
    });
  };

  const handleMultipleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        const ids: string[] = selectedItems.map((item) => item._id);
        let toBeDeletedCartItems = [];

        for (let i = 0; i < ids.length; i++) {
          const doesExistInCart = cartItems.find((item) => item._id === ids[i]);
          if (doesExistInCart) {
            toBeDeletedCartItems.push(doesExistInCart);
          }
        }

        dispatch(deleteCartItems({ selectedCartItems: toBeDeletedCartItems }));
        const res = deleteMultipleProducts(ids);

        res.then((result) => {
          console.log({ result });

          if (result.data.success) {
            toast.success(result.data.message, { duration: 2000 });
            setSelectedItems([]);
            setSelectedRowKeys([]);
            setShowMultipleDeleteButton(false);
          } else {
            toast.error("Something went wrong !", { duration: 2000 });
          }
        });
      }
    });
  };

  const handleGoToUpdate = async (key: React.Key) => {
    clickedOne = data.find((item) => item.key === key);

    navigate(`/update-product/${clickedOne._id}`);
  };

  const handleGoToDetails = async (key: React.Key) => {
    clickedOne = data.find((item) => item.key === key);

    navigate(`/products/${clickedOne._id}`);
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
      render: (image: string, record) => (
        <img
          src={image}
          onClick={() => handleGoToDetails(record.key)}
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
        <div className="sm:flex gap-4">
          <Button
            className="w-12 bg-red-600"
            onClick={() => handleDeleteOne(record.key)}
          >
            {isDeleteLoading ? (
              "Deleting..."
            ) : (
              <RiDeleteBin6Fill className="w-full h-full" />
            )}
          </Button>
          <Button
            className="w-12 bg-blue-500"
            onClick={() => handleGoToUpdate(record.key)}
          >
            <FiEdit className="w-full h-full" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button
          onClick={() => navigate("/create-product")}
          className="bg-blue-500 text-white hover:bg-rose-600"
        >
          Add Product
        </Button>
        {showMultipleDeleteButton ? (
          <Button
            onClick={handleMultipleDelete}
            className="bg-red-600 text-white hover:bg-rose-600"
          >
            {isDeleteMultipleLoading ? "Deleting..." : "Delete Selected"}
          </Button>
        ) : (
          ""
        )}
      </div>
      <div>
        {data.length === 0 ? (
          <div className="flex justify-center">
            <img src={img} style={{ maxWidth: 350 }} alt="" />
          </div>
        ) : (
          <Table
            className=" "
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
