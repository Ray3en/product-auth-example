import { Bounce, toast } from "react-toastify";

const toastSettings = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
} as const

export const showNotification = (type: 'success' | 'error', message: string) => {

    if (type === 'success') {
        toast.success(message, toastSettings);

    } else if (type === 'error') {
        toast.error(message, toastSettings);
    }

}