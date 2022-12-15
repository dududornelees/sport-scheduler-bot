export const stringToDate = (stringDate: string): Date => {
    const splitedStringDate = stringDate.split(":");
    const splitedStringDateHours = parseInt(splitedStringDate[0]);

    const date = new Date();
    date.setHours(splitedStringDateHours);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
};
