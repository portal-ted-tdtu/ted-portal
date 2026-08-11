export function buildSchoolYear(year) {

    const currentYear = Number(year);
    const nextYear = currentYear + 1;

    const currentSuffix =
        String(currentYear).slice(-2);

    const nextSuffix =
        String(nextYear).slice(-2);

    return {
        school_year_id:
            `NH${currentSuffix}${nextSuffix}`,

        school_year_name:
            `Năm học ${currentYear} - ${nextYear}`,

        date_start:
            `${currentYear}-09-05`,

        date_end:
            `${nextYear}-09-04`
    };
}