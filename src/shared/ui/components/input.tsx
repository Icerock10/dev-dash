import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import {
    useId,
    useState,
    useCallback,
    useFormController,
} from '~/shared/hooks/hooks';
import { EyeIcon } from '../icons/icons';

const INPUT_DEFAULT_MAX_LENGTH = 25;

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    disabled?: boolean;
    errorMessage?: string;
    errors: FieldErrors<T>;
    isRequired?: boolean;
    label: string;
    max?: string;
    maxLength?: number;
    min?: string;
    name: FieldPath<T>;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'date' | 'email' | 'password' | 'text';
};

const Input = <T extends FieldValues>({
    control,
    disabled = false,
    errorMessage,
    errors,
    isRequired,
    label,
    max,
    maxLength = INPUT_DEFAULT_MAX_LENGTH,
    min,
    name,
    onBlur,
    placeholder = '',
    type = 'text',
}: Properties<T>): React.ReactElement => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputId = useId();
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message ?? errorMessage;
    const hasError = Boolean(error);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((previous) => !previous);
    }, []);

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            field.onBlur();

            if (onBlur) {
                onBlur(event);
            }
        },
        [field, onBlur],
    );

    return (
        <div className="mb-5">
            <label
                className="mb-1.5 block text-[13px] font-medium text-slate-400"
                htmlFor={inputId}
            >
                {label}
            </label>
            <div className="relative flex items-center rounded-md focus-within:outline-1 focus-within:outline-blue-400">
                <input
                    {...field}
                    aria-invalid={hasError}
                    className="border-border w-full rounded-md border bg-[#0c1020] px-3 py-1.5 placeholder:text-xs placeholder:text-slate-600 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                    disabled={disabled}
                    id={inputId}
                    max={max}
                    maxLength={maxLength}
                    min={min}
                    name={name}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    required={isRequired}
                    type={inputType}
                />
                {isPasswordField && (
                    <button
                        className="absolute right-3 cursor-pointer"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        onClick={togglePasswordVisibility}
                        type="button"
                    >
                        <span
                            className="text-slate-600 hover:text-slate-400"
                            aria-hidden="true"
                        >
                            <EyeIcon width={20} height={20} />
                        </span>
                    </button>
                )}
            </div>
            {hasError && (
                <p className="mt-3 text-sm text-red-400">{error as string}</p>
            )}
        </div>
    );
};

export { Input };
