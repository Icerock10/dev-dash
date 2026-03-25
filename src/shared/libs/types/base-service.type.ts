type BaseService<T, TCreate> = {
    create: (payload: TCreate) => Promise<T>;
    getAll: () => Promise<T[]>;
};

export { type BaseService };
