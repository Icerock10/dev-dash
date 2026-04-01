import { normalizeStatus } from '~/shared/libs/helpers/helpers';
import { JOB_STATUS_COLORS } from '~/entities/job/ui/libs/helpers/helpers';

const formatAndGetStatusBadges = (): string[] => {
    return Object.keys(JOB_STATUS_COLORS).map((status) =>
        normalizeStatus(status),
    );
};

export { formatAndGetStatusBadges };
