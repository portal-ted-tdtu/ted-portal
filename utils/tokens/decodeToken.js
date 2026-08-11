// ./utils/tokens/decodeToken.js

/**
 * Decode JWT payload
 *
 * @param {string} token
 * @returns {Object|null}
 */
export function decodeToken(token) {

    try {

        const payload =
            token.split(".")[1];

        const decoded =
            atob(payload);

        return JSON.parse(
            decoded
        );

    } catch {

        return null;
    }
}