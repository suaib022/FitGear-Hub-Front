/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React from "react";

const Product = () => {
  const [percent, setPercent] = React.useState(-50);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current);
  }, [percent]);

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

// <form>
//   <div className="grid w-full items-center gap-4">
//     <div className="flex flex-col space-y-1.5">
//       <Label htmlFor="name">Name</Label>
//       <Input id="name" placeholder="Name of your project" />
//     </div>
//     <div className="flex flex-col space-y-1.5">
//       <Label htmlFor="framework">Framework</Label>
//       <Select>
//         <SelectTrigger id="framework">
//           <SelectValue placeholder="Select" />
//         </SelectTrigger>
//         <SelectContent position="popper">
//           <SelectItem value="next">Next.js</SelectItem>
//           <SelectItem value="sveltekit">SvelteKit</SelectItem>
//           <SelectItem value="astro">Astro</SelectItem>
//           <SelectItem value="nuxt">Nuxt.js</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   </div>
// </form>
