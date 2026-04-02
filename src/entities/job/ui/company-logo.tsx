import {
    firstCharUpperCase,
    getClassNames,
} from '~/shared/libs/helpers/helpers';
import { getCompanyColor } from '../model/libs/helpers/helpers';
import { type ValueOf } from '~/shared/libs/types/types';

const CompanyLogoVariant = {
    DEFAULT: 'default',
    SHRINK: 'shrink',
} as const;

type Properties = {
    jobCompanyName: string;
    variant?: ValueOf<typeof CompanyLogoVariant>;
};

const CompanyLogo: React.FC<Properties> = ({
    jobCompanyName,
    variant = CompanyLogoVariant.DEFAULT,
}): React.ReactNode => {
    const companyColor = getCompanyColor(jobCompanyName);
    const companyInitial = firstCharUpperCase(jobCompanyName);

    const companyLogoClasses: Record<
        ValueOf<typeof CompanyLogoVariant>,
        string
    > = {
        [CompanyLogoVariant.DEFAULT]: 'h-8 w-8 text-sm',
        [CompanyLogoVariant.SHRINK]: 'w-5.5 h-5.5 text-[11px]',
    };

    const logo = (
        <div
            className={getClassNames(
                companyLogoClasses[variant],
                'flex shrink-0 items-center justify-center rounded-lg',
                companyColor.bg,
                companyColor.text,
            )}
        >
            {companyInitial}
        </div>
    );

    return logo;
};

export { CompanyLogo };
