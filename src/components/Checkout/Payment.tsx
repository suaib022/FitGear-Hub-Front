/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Form, Radio, Result } from "antd";
import { useEffect, useState } from "react";
import {
  useGetallProductsQuery,
  useUpdateSingleProductMutation,
} from "@/redux/features/product/productApi";
import { useOutletContext } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = ({
  paymentSuccess,
  setPaymentSuccess,
  setDisableProceedButton,
  paymentMethod,
  setPaymentMethod,
  updateProductQuantities,
  isLoading,
}) => {
  const [showCardForm, setShowCardForm] = useState(false);
  // const [existingProducts, setExistingProducts] = useState([]);

  // const { selectedCartItems, setSelectedCartItems } = useOutletContext();

  type FieldType = {
    method?: string;
  };

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

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
    setShowCardForm(paymentMethod === "card");
    if (paymentMethod === "cash") {
      setDisableProceedButton(false);
    } else {
      setDisableProceedButton(true);
    }
  };

  return (
    <div>
      {paymentSuccess ? (
        <div>
          <Result
            status="success"
            title="Payment Successful"
            subTitle="Order number: 2017182818828182881 "
          />
        </div>
      ) : (
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="method"
              rules={[
                {
                  required: true,
                  message:
                    "Please let us know from where you want to receive our products!",
                },
              ]}
              label="Select Payment Method "
            >
              <Radio.Group
                defaultValue={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <Radio value="cash">Cash On Delivery</Radio>
                <Radio value="card">Pay With Card</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>

          <div className="mt-12">
            {paymentMethod === "card" && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  isLoading={isLoading}
                  updateProductQuantities={updateProductQuantities}
                  setPaymentSuccess={setPaymentSuccess}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
