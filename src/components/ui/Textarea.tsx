import { Field, Label, Textarea as HeadlessTextarea } from "@headlessui/react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = ({ label, error, ...props }: TextareaProps) => {
  const borderClasses = error
    ? "border-error border-2 focus:ring-error"
    : "border-gray-medium border";

  return (
    <Field className="flex flex-col gap-1">
      <Label className="font-semibold">{label}</Label>
      <HeadlessTextarea
        {...props}
        className={`rounded-xl border bg-white px-4 py-2 font-normal ${borderClasses}`}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </Field>
  );
};

export default Textarea;
