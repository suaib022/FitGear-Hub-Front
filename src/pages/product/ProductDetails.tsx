import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  // Handle the case where id might be undefined
  if (productId === undefined) {
    return <div>Error: ID is missing</div>;
  }
  console.log({ productId });
  const { data } = useGetSingleProductQuery(productId);
  console.log("single product:", data);
  return <div>Product details</div>;
};

export default ProductDetails;
