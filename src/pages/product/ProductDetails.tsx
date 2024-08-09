/* eslint-disable react-hooks/rules-of-hooks */
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { Button } from "antd";
import { RxCrossCircled } from "react-icons/rx";

import { FaCheckCircle, FaFontAwesome } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  // Handle the case where id might be undefined
  if (productId === undefined) {
    return <div>Error: ID is missing</div>;
  }
  console.log({ productId });
  const { data } = useGetSingleProductQuery(productId);

  console.log("single product:", data?.data);

  if (!data) {
    return <h2>This feature is unavailable at this moment !</h2>;
  }

  const { _id, name, price, description, category, quantity, inStock } =
    data.data;

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const cartData = {
      _id,
      name,
      price,
      quantity: 1,
      image:
        "https://res.cloudinary.com/dh4n0j5yl/image/upload/v1720090890/2034020005-Suaib.png",
      quantityInStock: quantity,
    };

    dispatch(addToCart(cartData));
  };

  return (
    <div className="flex sm:flex-row flex-col gap-6">
      <div className="sm:w-1/2 border-red-700 my-auto">
        <img
          className="sm:h-64 sm:w-full md:h-4/5 md:m-auto lg:w-full lg:h-full"
          src="https://res.cloudinary.com/dh4n0j5yl/image/upload/v1720090890/2034020005-Suaib.png"
          alt=""
        />
      </div>
      <div className="space-y-4 my-auto sm:w-1/2">
        <h2 className="text-3xl font-semibold">{name}</h2>

        <h2 className="font-medium">
          Category : <span className="text-blue-500">{category}</span>
        </h2>
        <p className="">Description : {description}</p>
        <Button
          onClick={handleAddToCart}
          className="hover:bg-rose-600 hover:text-white max-w-24 border-rose-700"
        >
          Add To Cart
        </Button>
        <h2 className="text-yellow-600">${price}</h2>
        <h2 className="flex items-center gap-1">
          {inStock ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <p>In stock</p>
            </>
          ) : (
            <>
              <RxCrossCircled className="text-red-500" />
              <p>Out Of stock</p>
            </>
          )}
          ({quantity} pieces available)
        </h2>
      </div>
    </div>
  );
};

export default ProductDetails;
