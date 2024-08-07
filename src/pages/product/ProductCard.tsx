import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({ product }) => {
  console.log("object1", product);
  return (
    <Card className="">
      <CardHeader className="gap-2">
        <CardTitle>Adjustable Dumbbells</CardTitle>
        <h3>$450</h3>
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
              Pair of adjustable dumbbells with a range of 5-50 lbs.
            </CardDescription>
          </div>
          <div className="flex justify-between ">
            <Button className="bg-blue-500 hover:bg-rose-600">Details</Button>
            <Button
              className="hover:bg-rose-600 hover:text-white border max-w-24 border-black"
              variant="link"
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
