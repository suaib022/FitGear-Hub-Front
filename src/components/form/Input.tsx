import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  value?: string | number;
  className?: string;
};

const FormInput = ({ type, name, label, value, className }: TInputProps) => {
  return (
    <div>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) =>
          type === "textarea" ? (
            <Input.TextArea className={className} id={name} {...field} />
          ) : (
            <Input
              className={className}
              {...field}
              type={type}
              defaultValue={value}
              id={name}
            ></Input>
          )
        }
      ></Controller>
    </div>
  );
};

export default FormInput;
