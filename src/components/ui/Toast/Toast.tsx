import { Slide, toast } from "react-toastify";
import "../Toast/toast.css";

const ShowSuccessToast = (message: string) =>
  toast(
    <div className="flex items-center justify-between gap-4 text-lg font-medium text-black">
      <div className="flex size-8 items-center justify-center rounded-full bg-white">
        <span className="iconify-[material-symbols--check]"></span>
      </div>
      <p>{message}</p>
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

export default ShowSuccessToast;
