import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart, getAllCartItems } from "@/redux/features/cart/cartSlice";
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";

const MAX_DESCRIPTION_LENGTH = 70;
const MAX_NAME_LENGTH = 20;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const { disabledCartButtons, setDisabledCartButtons } = useOutletContext();

  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetallProductsQuery({ limit: 5000 });
  const allCartItems = useAppSelector(getAllCartItems);

  const { _id, name, price, description, image, category, quantity, inStock } =
    product;

  useEffect(() => {
    if (
      !isAllProductsLoading &&
      !isAllProductsError &&
      allProducts &&
      allCartItems
    ) {
      let disabledButtons = [];

      for (let i = 0; i < allProducts.data?.length; i++) {
        const product = allProducts.data[i];
        const existingCartItem = allCartItems.find(
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
    allCartItems,
    allProducts,
    isAllProductsLoading,
    isAllProductsError,
    setDisabledCartButtons,
  ]);

  // console.log({ allProducts, allCartItems, disabledCartButtons });

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleName = () => {
    setShowFullName(!showFullName);
  };

  const truncateDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !showFullDescription
      ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const truncateName =
    name.length > MAX_NAME_LENGTH && !showFullName
      ? `${name.substring(0, MAX_NAME_LENGTH)}...`
      : name;

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
    toast.success("Item added to cart successfully !", {
      duration: 1500,
    });
  };

  const isDisabled = disabledCartButtons.find((button) => button[_id] === true);

  if (isAllProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isAllProductsError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="gap-2">
        <CardTitle>
          {truncateName}
          {name.length > MAX_NAME_LENGTH && (
            <span
              onClick={toggleName}
              className="text-blue-500 cursor-pointer hover:underline text-lg"
            >
              {showFullName ? " See less" : " See more"}
            </span>
          )}
        </CardTitle>
        <h3>${price}</h3>
      </CardHeader>
      <CardContent>
        <img
          src="https://res.cloudinary.com/dh4n0j5yl/image/upload/v1720090890/2034020005-Suaib.png"
          alt=""
        />
      </CardContent>
      <CardFooter className="  ">
        <div className="space-y-4  flex flex-col mx-auto gap-4">
          <div className="">
            <CardDescription className="text-black">
              {truncateDescription}
              {description.length > MAX_DESCRIPTION_LENGTH && (
                <span
                  onClick={toggleDescription}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  {showFullDescription ? " See less" : " See more"}
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex justify-between ">
            <Button
              onClick={() => navigate(`/products/${product?._id}`)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Details
            </Button>
            <Button
              disabled={!!isDisabled}
              onClick={handleAddToCart}
              className="text-white hover:bg-rose-600 bg-rose-500  max-w-24 border-rose-700 hover:text-white"
              variant="outline"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
