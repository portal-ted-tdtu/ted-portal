// utils\getQuery.js

/**
 * Parse query string
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
        query[key] = value;
    }

    return query;
}