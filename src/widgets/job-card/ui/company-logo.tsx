import {
    firstCharUpperCase,
    getClassNames,
} from '~/shared/libs/helpers/helpers';
import { getCompanyColor } from '~/entities/job/index';

type Properties = {
    jobCompanyName: string;
};

const CompanyLogo: React.FC<Properties> = ({
    jobCompanyName,
}): React.ReactNode => {
    const companyColor = getCompanyColor(jobCompanyName);
    const companyInitial = firstCharUpperCase(jobCompanyName);

    const logoClasses = getClassNames(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
        companyColor.bg,
        companyColor.text,
    );

    const logo = <div className={logoClasses}>{companyInitial}</div>;

    return logo;
};

export { CompanyLogo };
