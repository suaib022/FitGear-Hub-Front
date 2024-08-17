import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { Button, Row, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateProduct = () => {
  const [imageUrl, setImageUrl] = useState("");

  console.log({ imageUrl });

  const defaultValues = {
    name: "Safi",
    price: 10,
    description: "Delulu",
    image: imageUrl,
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
        price: Number(data.price),
        description: data.description,
        image: imageUrl,
        category: data.category,
        quantity: Number(data.quantity),
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

  const uploadProps: UploadProps = {
    action: image_hosting_api,
    name: "image",
    listType: "picture",
    onChange({ file }) {
      if (file.status === "done") {
        const uploadedImageUrl = file.response.data.url;
        setImageUrl(uploadedImageUrl);
        toast.success("Image uploaded successfully!");
      } else if (file.status === "error") {
        toast.error("Image upload failed");
      } else if (file.status === "removed") {
        setImageUrl("");
        toast.info("Image removed");
      }
    },
    onRemove(file) {
      setImageUrl("");
    },
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
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <FormInput type="text" name="category" label="Category :"></FormInput>
        <FormInput type="number" name="quantity" label="Quantity :"></FormInput>
        <Button htmlType="submit">Create</Button>
      </UseForm>
    </Row>
  );
};

export default CreateProduct;
