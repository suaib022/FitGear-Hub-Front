import { FiEdit } from "react-icons/fi";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  useDeleteSingleProductMutation,
  useGetallProductsQuery,
} from "@/redux/features/product/productApi";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [
    deleteSingleProduct,
    { isError: isDeleteError, isLoading: isDeleteLoading },
  ] = useDeleteSingleProductMutation();

  let selectedItems;

  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery(undefined);
  console.log({ products });
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
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    selectedItems = data.filter((item) =>
      newSelectedRowKeys.includes(item.key)
    );
    console.log("Selected :", selectedItems);
  };

  // actions
  const handleDeleteOne = async (key: React.Key) => {
    const selectedOne = data.find((item) => item.key === key);

    const res = await deleteSingleProduct(selectedOne!._id);
    console.log({ res });
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
          <Button className="w-12 bg-blue-500">
            <FiEdit className="w-full h-full" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button className="bg-blue-500 text-white hover:bg-rose-600">
        <NavLink to={"/create-product"}>Add Product</NavLink>
      </Button>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Cart;
