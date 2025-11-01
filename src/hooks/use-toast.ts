import { toast, type ToasterProps } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

const defaultOptions: Partial<ToasterProps> = {
  position: "top-center",
};

const defaultMessages = {
  error: "요청을 처리하는 데 실패했습니다.",
  success: "요청이 성공적으로 처리되었습니다.",
  info: "새로운 알림이나 정보가 있습니다.",
  warning: "주의가 필요한 사항이 있습니다.",
};

function showToast(type: ToastType, message: string, options?: ToasterProps) {
  toast[type](message, {
    ...defaultOptions,
    ...options,
  });
}

export function useToast() {
  const showSuccessToast = (
    message: string = defaultMessages.success,
    options?: ToasterProps,
  ) => showToast("success", message, options);

  const showErrorToast = (
    message: string = defaultMessages.error,
    options?: ToasterProps,
  ) => showToast("error", message, options);

  const showInfoToast = (
    message: string = defaultMessages.info,
    options?: ToasterProps,
  ) => showToast("info", message, options);

  const showWarningToast = (
    message: string = defaultMessages.warning,
    options?: ToasterProps,
  ) => showToast("warning", message, options);

  return {
    showErrorToast,
    showSuccessToast,
    showInfoToast,
    showWarningToast,
  };
}
