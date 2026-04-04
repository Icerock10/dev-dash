const DEFAULT_STATUS_COUNT = 0;

const sortStatusBadges = (
    statusBadges: string[],
    statusFiltersWithCount: Record<string, number>,
): string[] => {
    return statusBadges.toSorted(
        (a, b) =>
            (statusFiltersWithCount[b.toUpperCase()] ?? DEFAULT_STATUS_COUNT) -
            (statusFiltersWithCount[a.toUpperCase()] ?? DEFAULT_STATUS_COUNT),
    );
};

export { sortStatusBadges };
