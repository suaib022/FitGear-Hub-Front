import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, FormProps } from "antd";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useOutletContext } from "react-router-dom";
import { deleteCartItems } from "@/redux/features/cart/cartSlice";
import { useEffect } from "react";
import {
  useGetallProductsQuery,
  useUpdateSingleProductMutation,
} from "@/redux/features/product/productApi";

type FieldType = {
  name?: string;
  contact?: number;
  email?: string;
  address?: string;
  receiveFrom?: string;
};

const CheckoutForm = ({
  setPaymentSuccess,
  updateProductQuantities,
  isLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const { selectedCartItems, setSelectedCartItems } = useOutletContext();

  // const [updateSingleProduct] = useUpdateSingleProductMutation();
  // const { data: allProducts, isLoading } = useGetallProductsQuery({
  //   limit: 50000,
  // });

  // useEffect(() => {
  //   if (allProducts && selectedCartItems) {
  //     const existingItems = selectedCartItems.map((cartItem) =>
  //       allProducts.data.find((product) => product._id === cartItem._id)
  //     );

  //     setExistingProducts(existingItems);
  //   }
  // }, [selectedCartItems, setExistingProducts, allProducts]);

  // const updateProductQuantities = async () => {
  //   const updatedProducts = existingProducts.map((product) => {
  //     const cartItem = selectedCartItems.find(
  //       (item) => item._id === product._id
  //     );
  //     if (cartItem) {
  //       return {
  //         ...product,
  //         quantity: product.quantity - cartItem.quantity,
  //       };
  //     }
  //     return product;
  //   });

  //   setExistingProducts(updatedProducts);

  //   for (const product of updatedProducts) {
  //     const cartItem = selectedCartItems.find(
  //       (item) => item._id === product._id
  //     );
  //     if (cartItem) {
  //       const updatedData = {
  //         quantity: product.quantity,
  //       };

  //       await updateSingleProduct({
  //         productId: product._id,
  //         updatedData,
  //       });
  //     }
  //   }
  // };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const toastId = toast.loading("Payment in process...");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentSuccess(false);
      toast.error(error.message, { duration: 2000, id: toastId });
    } else {
      toast.success("Payment Successful !!!", { id: toastId, duration: 2000 });

      await updateProductQuantities();

      dispatch(deleteCartItems({ selectedCartItems }));
      setSelectedCartItems([]);
      setPaymentSuccess(true);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    toast.error("Something went wrong !", { duration: 2000 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Form
        className=""
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-end">
          <Button
            className="mt-6 w-20 bg-rose-600 hover:bg-rose-600"
            disabled={!stripe || !elements}
          >
            Pay
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutForm;
