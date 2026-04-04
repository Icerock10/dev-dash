import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { useFormController, useId } from '~/shared/hooks/hooks';
import { type SelectOption } from '~/shared/libs/types/types';

const booleanMap: Record<string, boolean> = {
    true: true,
    false: false,
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    options: SelectOption[];
    placeholder?: string;
};

const Select = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    options,
    placeholder,
}: Properties<T>): React.ReactElement => {
    const id = useId();
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <div className="mb-5 flex flex-col">
            {label && (
                <label
                    className="mb-1.5 block text-[13px] font-medium text-slate-400"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <select
                className="flex-1 rounded-md border border-[#1e2a45] px-3 py-2 focus-within:outline-1 focus-within:outline-blue-400"
                {...field}
                onChange={(event) => {
                    const { value } = event.target;
                    const isBooleanValue =
                        value in booleanMap ? booleanMap[value] : value;
                    field.onChange(isBooleanValue);
                }}
                id={id}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        className="bg-[#111827]"
                        key={String(option.value)}
                        value={String(option.value)}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {hasError && (
                <p className="mt-3 text-sm text-red-400">{error as string}</p>
            )}
        </div>
    );
};

export { Select };
