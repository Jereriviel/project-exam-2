import { Field, Label, Input as HeadlessInput } from "@headlessui/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  const borderClasses = error
    ? "border-error border-2 focus:ring-error"
    : "border-gray-medium border";

  return (
    <Field className="flex flex-col gap-1">
      <Label className="font-semibold">{label}</Label>
      <HeadlessInput
        {...props}
        className={`rounded-xl border bg-white px-4 py-2 font-normal ${borderClasses}`}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </Field>
  );
};

export default Input;
