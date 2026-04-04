const formatFullDate = (date: Date): string =>
    date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

export { formatFullDate };
