import { Field, Label, Input as HeadlessInput } from "@headlessui/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <Field className="flex flex-col gap-1">
      <Label className="text-lg font-semibold">{label}</Label>
      <HeadlessInput
        {...props}
        className="border-gray-medium rounded-xl border bg-white px-4 py-2 text-lg font-normal"
      />
    </Field>
  );
};

export default Input;
