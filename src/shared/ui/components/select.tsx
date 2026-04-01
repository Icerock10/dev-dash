import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type JSX } from 'react';
import { useFormController, useId } from '~/shared/hooks/hooks';

type SelectOption = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    options: SelectOption[];
};

const Select = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    options,
}: Properties<T>): JSX.Element => {
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
                className="flex-1 rounded-md border border-[#1e2a45] px-3 py-1.5 focus-within:outline-1 focus-within:outline-blue-400"
                {...field}
                id={id}
            >
                {options.map((option) => (
                    <option
                        className="bg-[#111827]"
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {hasError && <p>{error as string}</p>}
        </div>
    );
};

export { Select };
