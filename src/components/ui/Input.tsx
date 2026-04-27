interface InputProps {
  placeholder: string;
  label: string;
}

const Input = ({ placeholder, label }: InputProps) => {
  return (
    <>
      <label className="flex flex-col gap-1 text-lg font-semibold">
        {label}
        <input
          type="text"
          className="border-gray-medium rounded-xl border bg-white px-4 py-2 text-lg font-normal"
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default Input;
