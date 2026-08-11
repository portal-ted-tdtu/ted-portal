// ./utils/validators/dateValidator.js

export function isValidDate(
    date
) {

    return !isNaN(
        Date.parse(date)
    );
}