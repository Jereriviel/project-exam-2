import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-full items-center justify-center">
        <DialogPanel className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-xl sm:w-fit sm:p-8">
          <div className="flex w-full justify-between">
            <DialogTitle className="text-2xl font-semibold">
              {title}
            </DialogTitle>
            <button
              className="btn-round flex items-center justify-center"
              onClick={onClose}
            >
              <span className="iconify-[material-symbols--close]"></span>
            </button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
