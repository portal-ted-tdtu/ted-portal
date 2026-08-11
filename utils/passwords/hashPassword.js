// ./utils/passwords/hashPassword.js

import bcrypt from "bcryptjs";

/**
 * Hash password
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {

    if (!password) {
        throw new Error("Password is required");
    }

    const saltRounds = 10;

    return await bcrypt.hash(
        password,
        saltRounds
    );
}