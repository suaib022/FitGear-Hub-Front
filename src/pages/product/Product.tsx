/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Product = () => {
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

  if (!products.data) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ">
        {products.data.map((product: any) => (
          <ProductCard product={product} key={product._id}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Product;
