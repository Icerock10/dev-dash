const isOverdue = (dueDate: string | null | undefined): boolean => {
    if (!dueDate) {
        return false;
    }
    return new Date(dueDate) < new Date();
};

export { isOverdue };
