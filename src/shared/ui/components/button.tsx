import { type ValueOf } from '~/libs/types/types';
import { ButtonVariant } from '~/libs/enums/enums';

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
        [ButtonVariant.PRIMARY]: 'bg-primary w-full p-2 rounded-md text-sm',
    };

    return (
        <button
            aria-label={isIconOnly ? label : undefined}
            disabled={isDisabled}
            className={buttonClasses[variant as keyof typeof buttonClasses]}
            onClick={onClick}
            type={type}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            {!isIconOnly && <span>{label}</span>}
            {loader}
        </button>
    );
};

export { Button };
