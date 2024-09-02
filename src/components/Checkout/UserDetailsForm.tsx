/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addUserDetails,
  getUserDetails,
  removeUserDetails,
  TUserDetails,
} from "@/redux/features/UserDetails/userDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { FormProps } from "antd";
import { Button, Radio, Form, Input } from "antd";
import UserDetailsCard from "./UserDetailsCard";
import { useEffect, useState } from "react";

const { TextArea } = Input;

const UserDetailsForm = ({ setUserDetailsMissing }: any) => {
  type FieldType = {
    name?: string;
    contact?: number;
    email?: string;
    address?: string;
    receiveFrom?: string;
  };

  const [emptyUser, setEmptyUser] = useState(true);
  const [user, setUser] = useState<TUserDetails>();

  const dispatch = useAppDispatch();
  const doesUserExists = useAppSelector(getUserDetails);

  useEffect(() => {
    const isEmpty = !doesUserExists.name;
    if (isEmpty) {
      setEmptyUser(true);
    } else {
      setEmptyUser(false);
    }
    if (doesUserExists) {
      setUser({
        name: doesUserExists.name,
        contact: doesUserExists.contact,
        email: doesUserExists.email,
        shippingAddress: doesUserExists.shippingAddress,
        receivedFrom: doesUserExists.receivedFrom,
      });
    }
  }, [doesUserExists, setUser]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // const doesUserExists = useAppSelector(getUserDetails);
    // const isEmpty = Object.keys(doesUserExists).length === 0;
    const userDetails: TUserDetails = {
      name: values.name!,
      contact: values.contact!,
      email: values.email!,
      shippingAddress: values.address!,
      receivedFrom: values.receiveFrom!,
    };

    dispatch(removeUserDetails());
    dispatch(addUserDetails({ userDetails }));
    setEmptyUser(false);
    setUserDetailsMissing(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    _errorInfo
  ) => {
    setUserDetailsMissing(true);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Shipping Info :</h2>
      {!emptyUser ? (
        <div className="flex justify-center mt-8">
          <UserDetailsCard
            setEmptyUser={setEmptyUser}
            userDetails={doesUserExists}
          />
        </div>
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: user?.name || "",
            contact: user?.contact || "",
            email: user?.email || "",
            address: user?.shippingAddress || "",
            receiveFrom: user?.receivedFrom || "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="">
            <Form.Item<FieldType>
              name="receiveFrom"
              rules={[
                {
                  required: true,
                  message:
                    "Please let us know from where you want to receive our products!",
                },
              ]}
              label="Receive From "
            >
              <Radio.Group defaultValue={doesUserExists.receivedFrom}>
                <Radio value="home"> Home </Radio>
                <Radio value="office"> Office </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input defaultValue={doesUserExists.name!} className="max-w-72" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Contact Number"
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please enter your contact number!",
                },
              ]}
            >
              <Input
                defaultValue={doesUserExists.contact!}
                className="max-w-72"
                type="number"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your  Email Address!",
                },
              ]}
            >
              <Input
                defaultValue={doesUserExists.email!}
                className="max-w-72"
                type="email "
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please provide your Delivery Address!",
                },
              ]}
              label="Shipping Address"
            >
              <TextArea
                defaultValue={doesUserExists.shippingAddress!}
                className=" w-[470px]"
                rows={4}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
};

export default UserDetailsForm;
