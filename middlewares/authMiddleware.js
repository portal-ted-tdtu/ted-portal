// ./middlewares/authMiddleware.js

import { UnauthorizedError
 } from "../shared/errors/UnauthorizedError.js";

import { validateToken
 } from "../utils/tokens/validateToken.js";

import { decodeToken
 } from "../utils/tokens/decodeToken.js";

/**
 * JWT Authentication
 *
 * @param {Object} ctx
 */
export async function authMiddleware(
    ctx
) {

    const authHeader =
        ctx.request.headers.get(
            "Authorization"
        );

    if (
        !authHeader ||
        !authHeader.startsWith(
            "Bearer "
        )
    ) {

        throw new UnauthorizedError(
            "Token is required"
        );
    }

    const token =
        authHeader.replace(
            "Bearer ",
            ""
        );

    const valid =
        validateToken(token);

    if (!valid) {

        throw new UnauthorizedError(
            "Token invalid or expired"
        );
    }

    ctx.user =
        decodeToken(token);
}