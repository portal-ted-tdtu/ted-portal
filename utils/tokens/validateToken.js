// ./utils/tokens/validateToken.js

import { decodeToken } from "./decodeToken.js";

/**
 * Validate token
 *
 * @param {string} token
 * @returns {boolean}
 */
export function validateToken(token) {

    try {

        const payload =
            decodeToken(token);

        if (!payload) {
            return false;
        }

        const now =
            Math.floor(
                Date.now() / 1000
            );

        return payload.exp > now;

    } catch {

        return false;
    }
}