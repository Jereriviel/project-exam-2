import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

type VenueSortSelectProps = {
  currentValue: string;
  onChange: (value: string) => void;
};

const SORT_OPTIONS = [
  { label: "All Venues", value: "created-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Lowest Rated", value: "rating-asc" },
  { label: "Lowest Price", value: "price-asc" },
  { label: "Highest Price", value: "price-desc" },
];

const VenueSortSelect = ({ currentValue, onChange }: VenueSortSelectProps) => {
  return (
    <div className="relative w-full sm:w-fit">
      <Listbox value={currentValue} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="hover:bg-primary-light relative flex w-full cursor-pointer rounded-xl bg-white px-11 py-2 font-medium transition duration-500 ease-in-out">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="iconify-[prime--sort-alt]"></span>
            </span>
            {SORT_OPTIONS.find((opt) => opt.value === currentValue)?.label}
          </ListboxButton>
          <ListboxOptions className="border-gray-light absolute z-10 mt-1 max-h-60 w-full overflow-hidden rounded-xl border bg-white shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer px-4 py-2 transition duration-250 ease-in-out ${
                    active ? "bg-primary-light" : ""
                  }`
                }
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default VenueSortSelect;
