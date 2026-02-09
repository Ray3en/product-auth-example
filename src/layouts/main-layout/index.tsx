import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../app/providers/auth-provider";
import Modal from "../../shared/components/modal";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
    return (
        <div className="bg-gray-100">
            <AuthProvider>
                <Outlet />
                <Modal/>
                <ToastContainer/>
            </AuthProvider>
        </div >
    );
};