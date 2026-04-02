const isOverdue = (dueDate: Date | null | undefined): boolean => {
    if (!dueDate) {
        return false;
    }
    return dueDate < new Date();
};

export { isOverdue };
