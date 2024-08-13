/* eslint-disable react-hooks/rules-of-hooks */
import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import {
  useGetSingleProductQuery,
  useUpdateSingleProductMutation,
} from "@/redux/features/product/productApi";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type TUpdatedData = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  quantity?: number;
};

const UpdateProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  // Handle the case where id might be undefined
  if (productId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  const { data, isLoading } = useGetSingleProductQuery(productId);
  const [updateSingleProduct] = useUpdateSingleProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: data.data.name,
    price: data.data.price,
    description: data.data.description,
    image: data.data.image,
    category: data.data.category,
    quantity: data.data.quantity,
  };

  const onSubmit = async (data: FieldValues) => {
    let toastId;
    try {
      toastId = toast.loading("Updating product...");
      const updatedData: TUpdatedData = {
        name: data?.name,
        price: Number(data?.price),
        description: data?.description,
        image: data?.image,
        category: data?.category,
        quantity: Number(data?.quantity),
      };

      const res = await updateSingleProduct({
        productId,
        updatedData,
      });

      toast.success(res.data.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log({ err });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UseForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type="text" name="name" label="Name :"></FormInput>
        <FormInput type="number" name="price" label="Price :"></FormInput>
        <FormInput
          type="text"
          name="description"
          label="Description :"
        ></FormInput>
        <FormInput type="text" name="image" label="Image Url :"></FormInput>
        <FormInput type="text" name="category" label="Category :"></FormInput>
        <FormInput type="number" name="quantity" label="Quantity :"></FormInput>
        <Button htmlType="submit">Update</Button>
      </UseForm>
    </Row>
  );
};

export default UpdateProduct;
