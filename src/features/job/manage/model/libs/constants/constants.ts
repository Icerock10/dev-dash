import { JobStatus } from '~/shared/libs/enums/enums';
import { normalizeStatus } from '~/shared/libs/helpers/helpers';

const JOB_STATUS_OPTIONS = Object.values(JobStatus).map((status) => ({
    label: normalizeStatus(status),
    value: status,
}));

export { JOB_STATUS_OPTIONS };
