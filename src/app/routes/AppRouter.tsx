import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../pages/login-page";
import { AuthLayout } from "../../layouts/auth-layout";
import { MainLayout } from "../../layouts/main-layout";
import { ProductsPage } from "../../pages/products-page";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProductsPage/>} />
                </Route>

                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};