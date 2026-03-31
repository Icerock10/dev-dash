import { firstCharUpperCase } from '~/shared/libs/helpers/helpers';
import { getCompanyColor } from './libs/helpers/helpers';

type Properties = {
    jobCompanyName: string;
};

const CompanyLogo: React.FC<Properties> = ({
    jobCompanyName,
}): React.ReactNode => {
    const companyColor = getCompanyColor(jobCompanyName);
    const companyInitial = firstCharUpperCase(jobCompanyName);

    const logo = (
        <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${companyColor.bg} text-sm font-semibold ${companyColor.text}`}
        >
            {companyInitial}
        </div>
    );

    return logo;
};

export { CompanyLogo };
