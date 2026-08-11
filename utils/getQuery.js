// utils/getQuery.js

/**
 * Parse query string
 *
 * Convert numeric query parameters
 * from string to number.
 *
 * @param {URL} url
 * @returns {Object}
 */
export function getQuery(url) {

    const query = {};

    for (
        const [key, value]
        of url.searchParams.entries()
    ) {

        if (
            value !== "" &&
            !Number.isNaN(Number(value))
        ) {

            query[key] = Number(value);

        } else {

            query[key] = value;
        }
    }

    return query;
}