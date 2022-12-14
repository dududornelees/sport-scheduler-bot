export const unifyHours = (hours) => {
    let unifiedHours = "";

    hours.map((hour: any, index: number) => {
        if (hours.length !== index + 1) {
            unifiedHours += `${hour.time}, `;
        } else {
            unifiedHours += `${hour.time}.`;
        }
    });

    return unifiedHours;
};
