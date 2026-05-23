import { forwardRef } from "react";

interface CheckboxProps {
  iconClass: string;
  amenityName: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ iconClass, amenityName, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          ref={ref}
          {...props}
          className="accent-primary-light size-4 rounded border"
        />
        <span className={iconClass}></span>
        <span>{amenityName}</span>
      </label>
    );
  },
);

export default Checkbox;
