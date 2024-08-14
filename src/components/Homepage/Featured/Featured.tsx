import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import FeaturedCard from "./Card";

const Featured = () => {
  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery(undefined);
  console.log({ products });

  if (isLoading) {
    return (
      <Flex
        className="flex justify-center items-center mt-12"
        align="center"
        gap="middle"
      >
        <Spin
          className=" inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-bold my-12 mx-auto flex justify-center">
        Featured Equipments
      </h2>
      <div className="grid text-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.data.map((item) => (
          <FeaturedCard key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
