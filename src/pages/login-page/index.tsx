import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../shared/api/features/auth/auth.api";
import { loginSchema, type LoginFormData } from "./forms/login.form";
import { useNavigate } from "react-router-dom";
import PasswordInputController from "../../shared/components/controllers/password.input.controller";
import LoginInputController from "../../shared/components/controllers/login.input.controller";

export const LoginPage = () => {

    const [rememberUser, setRememberUser] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'emilys',
            password: 'emilyspass',
        }
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(null)
            const res = await login({
                username: data.email,
                password: data.password,
                remember: rememberUser // Передаем флаг в мутацию
            }).unwrap();

            if (res.accessToken) {
                navigate('/')
            }

        } catch (e: any) {
            setError('Неправильный логин или пароль')
        }
    };

    const handleResetEmail = () => {
        reset({email: ''})
    }

    return (
        <div className="flex h-[100vh] items-center justify-center">
            <div className="p-10 flex flex-col gap-6 items-center border-1 border-gray-200 rounded-xl outline-solid outline-6 outline-white ">
                <div className="p-2 flex flex-col gap-5 items-center border-1 border-gray-200 rounded-[50%] outline-solid outline-4 outline-white ">
                    <img src="/public/logo.svg" />
                </div>
                <div className="flex flex-col items-center hustify-center gap-1">
                    <h2 className="text-[38px] font-bold">Добро пожаловать!</h2>
                    <p className="text-sm font-medium text-gray-400 cursor-pointer"> Пожалуйста, авторизируйтесь</p>
                </div>
                <form className="flex flex-col gap-5 w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <LoginInputController
                            control={control}
                            name="email"
                            title="Логин"
                            error={errors.email?.message}
                            handleReset={handleResetEmail}
                        />
                    </div>
                    <div>
                        <PasswordInputController
                            control={control}
                            name="password"
                            error={errors.password?.message}
                            title="Пароль"

                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={rememberUser}
                            onChange={(e) => setRememberUser(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium text-gray-400 cursor-pointer"
                        >
                            Запомнить данные
                        </label>
                    </div>
                    {error &&
                        <p className="text-xm text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </p>
                    }
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? 'Загрузка...' : 'Войти'}
                        </button>
                    </div>


                </form>
                <div className="flex items-center w-full my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase">ИЛИ</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p className="text-sm font-medium text-gray-400 cursor-pointer">
                    Нет акааунта? <span className="underline text-purple-500">Создать</span>
                </p>
            </div>

        </div>
    );
};

