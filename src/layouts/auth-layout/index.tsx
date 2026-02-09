import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="flex h-[100vh] items-center justify-center">
                <Outlet /> 
        </div>
    );
};