/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Steps, theme } from "antd";
import Payment from "../../components/Checkout/Payment";
import OrderSummary from "../../components/Checkout/OrderSummary";
import UserDetailsForm from "../../components/Checkout/UserDetailsForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getUserDetails,
  removeUserDetails,
} from "@/redux/features/UserDetails/userDetailsSlice";
import { deleteCartItems } from "@/redux/features/cart/cartSlice";
import {
  useGetallProductsQuery,
  useUpdateSingleProductMutation,
} from "@/redux/features/product/productApi";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}

const Checkout = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableProceedButton, setDisableProceedButton] = useState(false);
  const [userDetailsMissing, setUserDetailsMissing] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [existingProducts, setExistingProducts] = useState<Product[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedCartItems, setSelectedCartItems } = useOutletContext<any>();

  const [updateSingleProduct] = useUpdateSingleProductMutation();
  const { data: allProducts, isLoading } = useGetallProductsQuery({
    limit: 50000,
  });
  const doesUserExists = useAppSelector(getUserDetails);

  // get the products which are being ordered
  useEffect(() => {
    if (allProducts && selectedCartItems) {
      const existingItems = selectedCartItems.map((cartItem: any) =>
        allProducts.data.find((product: any) => product._id === cartItem._id)
      );

      setExistingProducts(existingItems as Product[]);
    }
  }, [selectedCartItems, setExistingProducts, allProducts]);

  // decrease products quantity after ordering
  const updateProductQuantities = async () => {
    const updatedProducts = existingProducts.map((product: any) => {
      const cartItem = selectedCartItems.find(
        (item: any) => item._id === product._id
      );
      if (cartItem) {
        return {
          ...product,
          quantity: product.quantity - cartItem.quantity,
        };
      }
      return product;
    });

    setExistingProducts(updatedProducts);

    for (const product of updatedProducts) {
      const cartItem = selectedCartItems.find(
        (item: any) => item._id === product._id
      );
      if (cartItem) {
        const updatedData = {
          quantity: product.quantity,
        };

        await updateSingleProduct({
          productId: product._id,
          updatedData,
        });
      }
    }
  };

  useEffect(() => {
    if (doesUserExists?.name) {
      setUserDetailsMissing(false);
    } else {
      setUserDetailsMissing(true);
    }
  }, [doesUserExists]);

  // 3 steps of checkout
  // step - 1 : check the order summary
  // step - 2 : user details form
  // step - 3 : payment
  const steps = [
    {
      title: "Summary",
      content: <OrderSummary />,
    },
    {
      title: "User Details",
      content: (
        <UserDetailsForm
          userDetailsMissing={userDetailsMissing}
          setUserDetailsMissing={setUserDetailsMissing}
        />
      ),
    },
    {
      title: "Payment",
      content: (
        <Payment
          isLoading={isLoading}
          updateProductQuantities={updateProductQuantities}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setDisableProceedButton={setDisableProceedButton}
          paymentSuccess={paymentSuccess}
          setPaymentSuccess={setPaymentSuccess}
        />
      ),
    },
  ];

  // handle steps changing
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // handle next button status according to the userDetails
  useEffect(() => {
    if (userDetailsMissing && current === 1) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [userDetailsMissing, current]);

  // handle proceed button status according to the payment status
  useEffect(() => {
    if (paymentMethod === "cash") {
      setDisableProceedButton(false);
    } else if (!paymentSuccess && current === 2) {
      setDisableProceedButton(true);
    } else {
      setDisableProceedButton(false);
    }
  }, [paymentSuccess, current, setDisableProceedButton, paymentMethod]);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    padding: "16px",
    boxSizing: "border-box",
    width: "100%",
  };

  // handle proceed
  const onProceed = () => {
    if (paymentMethod === "cash") {
      dispatch(deleteCartItems({ selectedCartItems }));
      setSelectedCartItems([]);
      updateProductQuantities();
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanks For Your Order",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
    dispatch(removeUserDetails());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        width: "100%",
      }}
    >
      <Steps
        className="font-semibold"
        current={current}
        items={items}
        style={{ width: "100%" }}
      />
      <div
        className="mt-8"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: current > 0 ? "space-between" : "flex-end",
          width: "100%",
        }}
      >
        {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
        {current < steps.length - 1 && (
          <Button
            disabled={disableNextButton}
            type="primary"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            disabled={disableProceedButton}
            type="primary"
            onClick={onProceed}
          >
            Proceed
          </Button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
