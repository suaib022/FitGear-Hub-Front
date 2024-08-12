import UseForm from "@/components/form/Form";
import FormInput from "@/components/form/Input";
import { Button, Row } from "antd";

const CreateProduct = () => {
  const defaultValues = {
    name: "...",
  };

  const onSubmit = () => {
    console.log({ defaultValues });
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UseForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type="text" name="name" label="Name :"></FormInput>
        <Button htmlType="submit">Create</Button>
      </UseForm>
    </Row>
  );
};

export default CreateProduct;
