import { useState } from "react";
import { Controller, type Control } from "react-hook-form";

interface PasswordInputControllerProps {
    control: Control<any>;
    name: string;
    title?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
}

const PasswordInputController: React.FC<PasswordInputControllerProps> = ({
    placeholder, name, control, title, error, disabled
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const type = showPassword ? 'text' : 'password'

    const togglePassword = () => setShowPassword((state) => !state);

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {title && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {title}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <div className="relative group">

                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                                ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`}>
                            <i className={`ti ti-user text-lg`}></i>
                        </span>
                        <input
                            {...field}
                            id={name}
                            type={type}
                            disabled={disabled}
                            placeholder={placeholder}
                            className={`
                                w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200
                                text-sm bg-white pl-10
                                ${error
                                    ? 'border-red-500 focus:ring-4 focus:ring-red-100'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 '
                                }
                                ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:border-gray-400'}
                            `}
                        />
                        <button onClick={togglePassword} type="button" className={`hover:text-blue-600 absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 `}>
                            {showPassword ? <i className={`ti ti-eye text-lg`}></i> : <i className={`ti ti-eye-off text-lg`}></i>}
                        </button>
                    </div>
                )}
            />
            {error && (
                <p className="text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default PasswordInputController;