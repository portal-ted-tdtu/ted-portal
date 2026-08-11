// ./utils/passwords/comparePassword.js

import bcrypt from "bcryptjs";

/**
 * Compare password
 *
 * @param {string} password
 * @param {string} hashedPassword
 *
 * @returns {Promise<boolean>}
 */
export async function comparePassword(
    password,
    hashedPassword
) {

    if (
        !password ||
        !hashedPassword
    ) {
        return false;
    }

    return await bcrypt.compare(
        password,
        hashedPassword
    );
}