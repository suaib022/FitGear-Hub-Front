/* eslint-disable react-hooks/rules-of-hooks */
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { RxCrossCircled } from "react-icons/rx";

import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, getAllCartItems } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const [disabledAddToCartButton, setDisabledAddToCartButton] = useState(false);
  const dispatch = useAppDispatch();
  const allCartItems = useAppSelector(getAllCartItems);
  const { productId } = useParams<{ productId: string }>();

  if (productId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  const { data } = useGetSingleProductQuery(productId);

  if (!data) {
    return <h2>This feature is unavailable at this moment !</h2>;
  }

  const { _id, name, price, description, category, quantity, inStock } =
    data.data;

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

    const doesExistInCart = allCartItems.find((item) => item._id === productId);

    if (
      doesExistInCart &&
      doesExistInCart.quantity + 1 >= doesExistInCart.quantityInStock
    ) {
      setDisabledAddToCartButton(true);
    } else {
      setDisabledAddToCartButton(false);
    }

    dispatch(addToCart(cartData));
    toast.success("Item added to cart successfully !", {
      duration: 1500,
    });
  };

  return (
    <div className="flex bg-gray-200 px-6 py-6 rounded-xl shadow-xl sm:flex-row flex-col gap-6">
      <div className="sm:w-1/2 border-red-700 my-auto">
        <img
          className="sm:h-64 sm:w-full md:h-4/5 md:m-auto lg:w-full lg:h-full"
          src="https://res.cloudinary.com/dh4n0j5yl/image/upload/v1720090890/2034020005-Suaib.png"
          alt=""
        />
      </div>
      <div className="space-y-4 my-auto sm:w-1/2">
        <h2 className="text-2xl font-semibold">{name}</h2>

        <h2 className="font-medium text-lg">
          Category : <span className="text-blue-500">{category}</span>
        </h2>
        <p className="text-lg italic">
          <span className="">Description</span> : {description}
        </p>
        <Button
          disabled={disabledAddToCartButton}
          onClick={handleAddToCart}
          className="bg-rose-600 hover:text-white max-w-24 border-rose-700 hover:bg-rose-700"
        >
          Add To Cart
        </Button>
        <h2 className="text-yellow-600 text-lg">$ {price}</h2>
        <h2 className="flex items-center gap-1 text-sm">
          {inStock ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <p className="">In stock</p>({quantity} pieces available)
            </>
          ) : (
            <>
              <RxCrossCircled className="text-red-500" />
              <p className="">Out Of stock</p>
            </>
          )}
        </h2>
      </div>
    </div>
  );
};

export default ProductDetails;
