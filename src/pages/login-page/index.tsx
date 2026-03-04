import { LoginForm } from "../../shared/components/auth/login-form.tsx";

export const LoginPage = () => {
    return (
        <div className="flex h-[100vh] items-center justify-center">
            {/* Вынос формы в отдельный компонент (например, вынос формы в boxed - компонент)*/}
            <LoginForm/>
        </div>
    );
};

