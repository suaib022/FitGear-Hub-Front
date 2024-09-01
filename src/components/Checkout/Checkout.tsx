import React, { useEffect, useState } from "react";
import { Button, Steps, theme } from "antd";
import Payment from "./Payment";
import OrderSummary from "./OrderSummary";
import UserDetailsForm from "./UserDetailsForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { removeUserDetails } from "@/redux/features/UserDetails/userDetailsSlice";
import { deleteCartItems } from "@/redux/features/cart/cartSlice";

const Checkout = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableProceedButton, setDisableProceedButton] = useState(false);
  const [userDetailsMissing, setUserDetailsMissing] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedCartItems, setSelectedCartItems } = useOutletContext();

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
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setDisableProceedButton={setDisableProceedButton}
          paymentSuccess={paymentSuccess}
          setPaymentSuccess={setPaymentSuccess}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (userDetailsMissing && current === 1) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [userDetailsMissing, current]);

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

  const onProceed = () => {
    if (paymentMethod === "cash") {
      dispatch(deleteCartItems({ selectedCartItems }));
      setSelectedCartItems([]);
    }
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
