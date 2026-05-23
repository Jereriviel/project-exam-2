import { forwardRef } from "react";

interface CheckboxProps {
  iconClass: string;
  amenityName: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ iconClass, amenityName, name, checked, onChange }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
          ref={ref}
          className="accent-primary-light size-4 rounded border"
        />

        <span className={iconClass}></span>
        <span>{amenityName}</span>
      </label>
    );
  },
);

export default Checkbox;
