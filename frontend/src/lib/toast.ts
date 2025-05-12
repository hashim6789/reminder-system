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
