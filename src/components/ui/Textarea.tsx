import { Field, Label, Textarea as HeadlessTextarea } from "@headlessui/react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = ({ label, ...props }: TextareaProps) => {
  return (
    <Field className="flex flex-col gap-1">
      <Label className="text-lg font-semibold">{label}</Label>
      <HeadlessTextarea
        {...props}
        className="border-gray-medium rounded-xl border bg-white px-4 py-2 text-lg font-normal"
      />
    </Field>
  );
};

export default Textarea;
