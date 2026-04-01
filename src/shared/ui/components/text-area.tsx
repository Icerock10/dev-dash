import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { useId, useCallback, useFormController } from '~/shared/hooks/hooks';

const TEXTAREA_DEFAULT_MAX_LENGTH = 500;
const TEXTAREA_DEFAULT_ROWS = 3;

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    disabled?: boolean;
    errorMessage?: string;
    errors: FieldErrors<T>;
    isRequired?: boolean;
    label: string;
    maxLength?: number;
    name: FieldPath<T>;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
};

const Textarea = <T extends FieldValues>({
    control,
    disabled = false,
    errorMessage,
    errors,
    isRequired,
    label,
    maxLength = TEXTAREA_DEFAULT_MAX_LENGTH,
    name,
    onBlur,
    placeholder = '',
    rows = TEXTAREA_DEFAULT_ROWS,
}: Properties<T>): React.ReactElement => {
    const textareaId = useId();
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message ?? errorMessage;
    const hasError = Boolean(error);

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
                htmlFor={textareaId}
            >
                {label}
            </label>
            <textarea
                {...field}
                aria-invalid={hasError}
                className="border-border w-full resize-none rounded-md border px-3 py-1.5 placeholder:text-xs placeholder:text-slate-600 focus-within:outline-1 focus-within:outline-blue-400 focus:outline-none"
                disabled={disabled}
                id={textareaId}
                maxLength={maxLength}
                name={name}
                onBlur={handleBlur}
                placeholder={placeholder}
                required={isRequired}
                rows={rows}
            />
            {hasError && (
                <p className="mt-3 text-sm text-red-400">{error as string}</p>
            )}
        </div>
    );
};

export { Textarea };
