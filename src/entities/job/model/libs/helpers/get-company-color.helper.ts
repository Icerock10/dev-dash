import { COMPANY_COLORS } from '../constants/constants';

const getCompanyColor = (company: string): { bg: string; text: string } => {
    const FIRST_POS = 0;
    const index =
        Number(company.codePointAt(FIRST_POS)) % COMPANY_COLORS.length;
    return COMPANY_COLORS[index];
};

export { getCompanyColor };
