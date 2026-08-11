// utils/tokens/createToken.js

import { SignJWT } from "jose";

function getSecret(secret) {

    if (!secret) {
        throw new Error("JWT secret is required");
    }

    return new TextEncoder().encode(secret);
}

/**
 * Tạo JWT Access Token
 *
 * @param {Object} payload
 * @param {String} secret
 * @param {String} expiresIn
 *
 * @returns {Promise<String>}
 */
export async function createToken(
    payload,
    secret,
    expiresIn = "4h"
) {

    if (!payload) {
        throw new Error("Payload is required");
    }

    const token = await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT"
        })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(getSecret(secret));

    return token;
}