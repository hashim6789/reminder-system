import { toast } from "sonner";

export const showSuccessToast = (message = "Success!") => {
  toast.success(message);
};

export const showErrorToast = (message = "Something went wrong!") => {
  toast.error(message);
};

export const showInfoToast = (message = "Here is some info.") => {
  toast.info(message);
};

export const showWarningToast = (message = "Be careful!") => {
  toast.warning(message);
};

export const confirmAction = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  toast(message, {
    action: {
      label: "Confirm",
      onClick: () => {
        onConfirm();
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {
        if (onCancel) onCancel();
      },
    },
    duration: 8000,
  });
};
