import { type ValueOf } from '~/shared/libs/types/types';
import { ButtonVariant } from '~/shared/libs/enums/enums';

type Properties<T extends string> = {
    className?: string;
    icon?: React.ReactNode;
    iconOnlySize?: 'large' | 'medium' | 'small';
    value?: T;
    isDisabled?: boolean;
    isActive?: boolean;
    isIconOnly?: boolean;
    label: string;
    loader?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: 'large' | 'small' | 'fit';
    type?: 'button' | 'submit';
    variant?: ValueOf<typeof ButtonVariant>;
};

const Button = <T extends string>({
    icon,
    isDisabled = false,
    isIconOnly = false,
    label,
    loader,
    onClick,
    type = 'button',
    variant = ButtonVariant.PRIMARY,
    isActive,
}: Properties<T>): React.ReactNode => {
    const getActiveTabClass = isActive ? 'bg-tab-button' : 'bg-transparent';

    const buttonClasses = {
        [ButtonVariant.TAB]: `flex-1 p-1.5 text-sm rounded-lg cursor-pointer ${getActiveTabClass}`,
        [ButtonVariant.PRIMARY]:
            'gap-2 bg-primary w-full p-2 rounded-md text-sm cursor-pointer',
        [ButtonVariant.GHOST]:
            'flex-1 text-[11px] rounded-lg cursor-pointer flex-row-reverse',
    };

    return (
        <button
            aria-label={isIconOnly ? label : undefined}
            disabled={isDisabled}
            className={`${buttonClasses[variant as keyof typeof buttonClasses]} flex items-center justify-center gap-2`}
            onClick={onClick}
            type={type}
        >
            {icon && (
                <span className="flex h-3 w-3 items-center" aria-hidden="true">
                    {icon}
                </span>
            )}
            {!isIconOnly && <span>{label}</span>}
            {loader}
        </button>
    );
};

export { Button };
