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
  let clickedOne: any;

  // console.log({ showMultipleDeleteButton });

  const [deleteSingleProduct, { isLoading: isDeleteLoading }] =
    useDeleteSingleProductMutation();

  const [deleteMultipleProducts, { isLoading: isDeleteMultipleLoading }] =
    useDeleteMultipleProductsMutation();

  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery({ limit: 5000 });

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
    return <div>Error loading products</div>;
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
  const handleDeleteOne = async (key: React.Key) => {
    const toastId = toast.loading("Deleting...");
    clickedOne = data.find((item) => item.key === key);

    const res = await deleteSingleProduct(clickedOne!._id);

    if (res.data.success) {
      toast.success("Deleted successfully !", { id: toastId, duration: 2000 });
    }
    if (res.error) {
      toast.error("Something went wrong !", { id: toastId, duration: 2000 });
    }
    console.log({ res });
  };

  const handleMultipleDelete = async () => {
    const ids: string[] = selectedItems.map((item) => item._id);
    const res = await deleteMultipleProducts(ids);

    if (res.data.data.deletedCount) {
      toast.success(`${res.data.message}`, { duration: 2000 });
    }
  };

  const handleGoToUpdate = async (key: React.Key) => {
    clickedOne = data.find((item) => item.key === key);

    navigate(`/update-product/${clickedOne._id}`);
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
        <Button className="bg-blue-500 text-white hover:bg-rose-600">
          <NavLink to={"/create-product"}>Add Product</NavLink>
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageProduct;
