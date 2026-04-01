import { firstCharUpperCase } from './first-char-upper-case.helper';

const STATUS_START_INDEX = 1;

const normalizeStatus = (status: string): string =>
    firstCharUpperCase(status) + status.slice(STATUS_START_INDEX).toLowerCase();

export { normalizeStatus };
