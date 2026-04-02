const parseBooleanParam = (value: string | undefined): boolean | undefined => {
    if (value == null) {
        return undefined;
    }
    return value === 'true';
};

export { parseBooleanParam };
