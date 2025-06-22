import { toast } from "react-toastify";

import type { ToastPosition } from "react-toastify";

const defaultToastOptions = {
  position: "bottom-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "dark",
};

export const showSuccessToast = (message: string) => {
  toast.success(message, defaultToastOptions);
};

export const showErrorToast = (message: string) => {
  toast.error(message, defaultToastOptions);
};
