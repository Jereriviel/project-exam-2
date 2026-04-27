interface TextareaProps {
  placeholder: string;
  label: string;
}

const Textarea = ({ placeholder, label }: TextareaProps) => {
  return (
    <>
      <label className="flex flex-col gap-1 text-lg font-semibold">
        {label}
        <textarea
          className="border-gray-medium rounded-xl border bg-white px-4 py-2 text-lg font-normal"
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default Textarea;
