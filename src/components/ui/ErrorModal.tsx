import Modal from "./Modal";
import { ApiError } from "../../error/ApiError";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: ApiError | null;
}

const ErrorModal = ({ isOpen, onClose, error }: ErrorModalProps) => {
  if (!error) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Error`}>
      <div className="space-y-4 text-lg">
        <hr className="text-gray-medium" />
        <div className="flex items-center gap-2">
          <span className="iconify-[material-symbols--error-outline]"></span>
          <p className="font-medium">{`${error.statusCode} ${error.status}`}</p>
        </div>
        <div className="flex gap-2">
          <p>{`${error.message}.`}</p>
          <p>Please try again.</p>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button className="btn-primary" onClick={onClose}>
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
