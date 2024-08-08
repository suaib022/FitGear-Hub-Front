import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MAX_DESCRIPTION_LENGTH = 70;
const MAX_NAME_LENGTH = 20;

const ProductCard = ({ product }) => {
  //   console.log("products: ", product);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  const { name, price, description, image, category, quantity, inStock } =
    product;

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

  return (
    <Card className="">
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
            <Button className="bg-blue-500 hover:bg-rose-600">
              <NavLink to={`/products/${product?._id}`}> Details</NavLink>
            </Button>
            <Button
              className="hover:bg-rose-600 hover:text-white max-w-24 border-rose-700"
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
