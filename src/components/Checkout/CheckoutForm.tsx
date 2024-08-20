import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, FormProps } from "antd";
import { Button } from "../ui/button";
import { toast } from "sonner";

type FieldType = {
  name?: string;
  contact?: number;
  email?: string;
  address?: string;
  receiveFrom?: string;
};

//   const { TextArea } = Input;

const CheckoutForm = ({ setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

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

    console.log({ Error });

    if (error) {
      setPaymentSuccess(false);
      toast.error(error.message, { duration: 2000, id: toastId });
    } else {
      toast.success("Payment Successful !!!", { id: toastId, duration: 2000 });
      setPaymentSuccess(true);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
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
