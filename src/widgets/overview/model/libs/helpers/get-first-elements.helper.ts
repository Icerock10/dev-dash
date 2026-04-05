const START_INDEX = 0;
const DEFAULT_END_INDEX = 4;

const getFirstElements = <T>(entity: T[], count = DEFAULT_END_INDEX): T[] => {
    return entity.slice(START_INDEX, count);
};

export { getFirstElements };
