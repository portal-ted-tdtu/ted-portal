// utils/tokens/verifyToken.js

import { jwtVerify } from "jose";

function getSecret(secret) {
    if (!secret) {
        throw new Error("JWT secret is required");
    }

    return new TextEncoder().encode(secret);
}

export async function verifyToken(token, secret) {
    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            getSecret(secret),
            {
                algorithms: ["HS256"]
            }
        );

        return payload;
    } catch {
        return null;
    }
}