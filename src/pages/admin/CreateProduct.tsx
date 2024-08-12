import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateProduct = () => {
  const defaultValues = {
    name: "Safi",
    price: 10,
    description: "Delulu",
    image: "www.holulu.com",
    category: "Black",
    quantity: 1,
  };

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: FieldValues) => {
    let toastId;
    try {
      toastId = toast.loading("Creating product...");
      const productData = {
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
        quantity: data.quantity,
      };

      const res = await createProduct(productData).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log({ err });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <Button htmlType="submit">Create</Button>
      </UseForm>
    </Row>
  );
};

export default CreateProduct;
