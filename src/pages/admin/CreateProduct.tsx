import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { Button, Row, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Select } from "antd";
import { useState } from "react";
import img from "../../assets/Form/1.png";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onCategorySelect = (value, label) => {
    setCategory(label);
    setCategoryError(false);
  };

  console.log({ category });

  const onSubmit = async (data: FieldValues) => {
    if (!category) {
      setCategoryError(true);
      return;
    }

    let toastId;
    try {
      toastId = toast.loading("Creating product...");
      const productData = {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        image: imageUrl,
        category: category.label as string,
        quantity: Number(data.quantity),
      };

      console.log({ productData });

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
      setImageUrl("");
      setDisableUploadButton(false);
    },
  };

  console.log({ imageUrl });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={img} alt="" />
      <div className="md:w-1/2 bg-blue-50 shadow-xl py-8 rounded-3xl">
        <h2 className="text-3xl font-semibold ml-8 mb-6">Add Product </h2>
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
              <h2 className="text-sm">Category :</h2>
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
                  { value: "1", label: "Cardio" },
                  { value: "2", label: "Strength" },
                  { value: "3", label: "Functional" },
                  { value: "4", label: "Bodyweight" },
                  { value: "5", label: "Accessories" },
                  { value: "6", label: "Recovery" },
                  { value: "7", label: "Flooring" },
                  { value: "8", label: "Storage" },
                  { value: "9", label: "Specialty" },
                  { value: "10", label: "Gym Packages" },
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
              <Button htmlType="submit">Create</Button>
            </div>
          </UseForm>
        </Row>
      </div>
    </div>
  );
};

export default CreateProduct;
