import LoadingSpinner from "../../../ui/LoadingSpinner";
import Modal from "../../../ui/Modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  message: string;
  confirmText?: string;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  message,
  confirmText = "Delete?",
}: ConfirmDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex w-full flex-col items-center gap-4 rounded-xl">
        <p>{message}</p>
        <div className="flex w-full flex-col gap-4">
          <button
            className="btn-delete flex h-12 min-w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : confirmText}
          </button>
          <button
            className="btn-secondary flex h-12 min-w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
