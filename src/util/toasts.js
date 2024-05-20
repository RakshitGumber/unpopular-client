import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const successToast = (msg, options) => {
  return toast.success(msg, {
    theme: options?.theme ?? "dark",
    position: "bottom-right",
    autoClose: 2000,
  });
};

export const errorToast = (err, options) =>
  toast.error(err, {
    theme: options?.theme ?? "dark",
    position: "bottom-right",
    autoClose: 2000,
  });

export const infoToast = (inf, options) =>
  toast.info(inf, {
    theme: options?.theme ?? "dark",
    position: "bottom-right",
    autoClose: 2000,
  });

export const warnToast = (warn, options) =>
  toast.warn(warn, {
    theme: options?.theme ?? "dark",
    position: "bottom-right",
    autoClose: 2000,
  });

export const defToast = (msg, options) =>
  toast(msg, {
    theme: options?.theme ?? "dark",
    position: "bottom-right",
    autoClose: 2000,
  });
