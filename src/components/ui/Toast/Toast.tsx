import { Slide, toast } from "react-toastify";
import "../Toast/toast.css";

export const ShowSuccessToast = (message: string) =>
  toast(
    <div className="flex items-center justify-between gap-4 text-lg font-medium">
      <div className="bg-success flex size-8 items-center justify-center rounded-full">
        <span className="iconify-[material-symbols--check] text-white"></span>
      </div>
      <p className="text-black">{message}</p>
    </div>,
    {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      className: "success-toast",
    },
  );

export const ShowFailToast = (message: string) =>
  toast(
    <div className="flex items-center justify-between gap-4 text-lg font-medium">
      <div className="bg-error flex size-8 shrink-0 items-center justify-center rounded-full">
        <span className="iconify-[material-symbols--exclamation-rounded] text-white"></span>
      </div>
      <p className="text-black">{message}</p>
    </div>,
    {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      className: "fail-toast",
    },
  );
