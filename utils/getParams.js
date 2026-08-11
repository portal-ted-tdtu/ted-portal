// ./utils/getParams.js

/**
 * Parse route params
 *
 * @param {string} pathname
 * @returns {string[]}
 */
export function getParams(pathname) {

    return pathname
        .split("/")
        .filter(Boolean)
        .map(item =>
            decodeURIComponent(item)
        );
}