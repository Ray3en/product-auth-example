import { Controller, type Control } from "react-hook-form";

interface InputControllerProps {
    control: Control<any>;
    name: string;
    title?: string;
    type: 'number' | 'text';
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
}

const InputController: React.FC<InputControllerProps> = ({
    icon, placeholder, name, control, title, type, error, disabled
}) => {
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
                        {icon && (
                            <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                                ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`}>
                                <i className={`ti ti-${icon} text-lg`}></i>
                            </span>
                        )}

                        <input
                            {...field}
                            id={name}
                            type={type}
                            disabled={disabled}
                            placeholder={placeholder}
                            className={`
                                w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200
                                text-sm bg-white 
                                ${icon ? 'pl-10' : ''}
                                ${error
                                    ? 'border-red-500 focus:ring-4 focus:ring-red-100'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 '
                                }
                                ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:border-gray-400'}
                            `}
                        />
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

export default InputController;