/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { Button, Flex, Row, Spin, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Select } from "antd";
import { useState } from "react";
import img from "../../assets/Form/1.png";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export type TCategory = {
  value?: string;
  label?: string;
};

const CreateProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<TCategory>({});
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onCategorySelect = (value: any, _label: any) => {
    setCategory({ value: value });
    setCategoryError(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const { price, quantity } = data;

    // validations of inputs before creating products
    if (price <= 0) {
      setPriceError(true);
      return;
    } else {
      setPriceError(false);
    }

    if (!category) {
      setCategoryError(true);
      return;
    }

    if (quantity <= 0) {
      setQuantityError(true);
      return;
    } else {
      setQuantityError(false);
    }

    let toastId;
    try {
      toastId = toast.loading("Creating product...");
      const productData = {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        image: imageUrl,
        category: category.value,
        quantity: Number(data.quantity),
      };

      console.log({ productData });

      // product creation
      const res = await createProduct(productData).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      setImageUrl("");
      setDisableUploadButton(false);
      navigate("/manage-products");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      setImageUrl("");
      setDisableUploadButton(false);
    }
  };

  // handle image upload
  const uploadProps: UploadProps = {
    action: image_hosting_api,
    name: "image",
    listType: "picture",
    onChange({ file }) {
      console.log({ file });
      if (file.status === "done") {
        const uploadedImageUrl = file.response.data.url;
        setImageUrl(uploadedImageUrl);
        setDisableUploadButton(true);
        toast.success("Image uploaded successfully!");
      } else if (file.status === "error") {
        toast.error("Image upload failed");
      } else if (file.status === "removed") {
        setImageUrl("");
        toast.info("Image removed");
      }
    },
    onRemove(file) {
      console.log({ file });
      setImageUrl("");
      setDisableUploadButton(false);
    },
  };

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

  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={img} alt="" />
      <div className="md:w-1/2 bg-blue-50 shadow-xl py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline">
          Add Product{" "}
        </h2>
        <Row className="" justify="center" align="middle" style={{}}>
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-2 font-semibold">
              <FormInput
                required={true}
                type="text"
                name="name"
                label="Name :"
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="price"
                label="Price :"
              ></FormInput>
              {priceError && (
                <div className="text-red-500">
                  Price must be a positive number
                </div>
              )}

              <FormInput
                required={true}
                className={`text-wrap`}
                type="textarea"
                name="description"
                label="Description :"
              ></FormInput>
              <FormInput
                required={true}
                value={imageUrl}
                className={`mb-1`}
                type="text"
                name="image"
                label="Image Url :"
              ></FormInput>
              <Upload className="" {...uploadProps}>
                <Button
                  disabled={disableUploadButton}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
              <h2 className="text-sm text-start">Category :</h2>
              <Select
                onSelect={onCategorySelect}
                showSearch
                placeholder="Select a category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "Cardio", label: "Cardio" },
                  { value: "Strength", label: "Strength" },
                  { value: "Functional", label: "Functional" },
                  { value: "BodyWeight", label: "Body Weight" },
                  { value: "Accessories", label: "Accessories" },
                  { value: "Recovery", label: "Recovery" },
                  { value: "Flooring", label: "Flooring" },
                  { value: "Storage", label: "Storage" },
                  { value: "Specialty", label: "Specialty" },
                  { value: "GymPackages", label: "Gym Packages" },
                ]}
              />
              {categoryError && (
                <div className="text-red-500">Please select a category</div>
              )}

              <FormInput
                required={true}
                type="number"
                name="quantity"
                label="Quantity :"
              ></FormInput>
              {quantityError && (
                <div className="text-red-500">
                  Quantity must be a positive number
                </div>
              )}

              <Button htmlType="submit">Create</Button>
            </div>
          </UseForm>
        </Row>
      </div>
    </div>
  );
};

export default CreateProduct;
