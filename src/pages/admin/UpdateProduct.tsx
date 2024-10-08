/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useGetSingleProductQuery,
  useUpdateSingleProductMutation,
} from "@/redux/features/product/productApi";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/Form/2.png";
import { toast } from "sonner";
import TextArea from "antd/es/input/TextArea";
import { useAppSelector } from "@/redux/hooks";
import {
  getAllCartItems,
  updateCartQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import errorImg from "../../assets/Result/error-404.png";
import { TCategory } from "./CreateProduct";

type TUpdatedData = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  quantity?: number;
};

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [imageUrl, setImageUrl] = useState("");
  const [Category, setCategory] = useState<TCategory>({});
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (productId === undefined) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  const { data: productData, isLoading } = useGetSingleProductQuery(productId);
  const cartItems = useAppSelector(getAllCartItems);
  const [updateSingleProduct] = useUpdateSingleProductMutation();

  // initially getting the product's previous values to put them as default values in form fields
  useEffect(() => {
    if (productData?.data) {
      const { name, price, description, image, category, quantity } =
        productData.data;
      setCategory(category);
      setImageUrl(image);
      form.setFieldsValue({
        name,
        price,
        description,
        image,
        category,
        quantity,
      });
    }
  }, [productData, form]);

  const onCategorySelect = (value: any, _label: any) => {
    setCategory({ value: value });
  };

  // handle updating product
  const onFinish = async (values: any) => {
    let toastId;
    try {
      toastId = toast.loading("Updating product...");
      const updatedData: TUpdatedData = {
        name: values.name,
        price: Number(values.price),
        description: values.description,
        image: values.image || imageUrl,
        category: values.Category || Category.value,
        quantity: Number(values.quantity),
      };

      console.log({ updatedData });

      const res = await updateSingleProduct({
        productId,
        updatedData,
      });

      // update product's quantity in cart if necessary
      const existingCartItem = cartItems.find((item) => item._id === productId);
      if (
        existingCartItem &&
        (existingCartItem.quantity as number) > Number(values.quantity)
      ) {
        dispatch(
          updateCartQuantity({
            updatedQuantity: Number(values.quantity),
            updatedQuantityInStock: Number(values.quantity),
            _id: productId,
          })
        );
      }
      setDisableUploadButton(false);

      toast.success(res.data.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/manage-products");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  // handle image upload
  const uploadProps: UploadProps = {
    action: image_hosting_api,
    name: "image",
    listType: "picture",
    onChange({ file }) {
      if (file.status === "done") {
        const uploadedImageUrl = file.response.data.url;
        setDisableUploadButton(true);
        setImageUrl(uploadedImageUrl);
        form.setFieldsValue({ image: uploadedImageUrl });
        toast.success("Image uploaded successfully!");
      } else if (file.status === "error") {
        toast.error("Image upload failed");
      }
    },
    onRemove() {
      setImageUrl("");
      form.setFieldsValue({ image: "" });
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
        <h2 className="text-3xl font-semibold ml-8 mb-6">Update Product </h2>

        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input className="max-w-72" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter your price!" },
                {
                  validator(_, value) {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Price must be a positive number!")
                    );
                  },
                },
              ]}
            >
              <Input className="max-w-72" type="number" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please provide your description!",
                },
              ]}
              label="Description"
            >
              <TextArea className=" w-[470px]" rows={4} />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Input value={imageUrl} className="max-w-72" type="text" />
              <Upload {...uploadProps}>
                <Button
                  disabled={disableUploadButton}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please enter your category!",
                },
              ]}
            >
              <Select
                onSelect={onCategorySelect}
                value={Category}
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
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter your quantity!",
                },
                {
                  validator(_, value) {
                    if (value >= 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Quantity must be a non-negative number!")
                    );
                  },
                },
              ]}
            >
              <Input className="max-w-72" type="number" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProduct;
