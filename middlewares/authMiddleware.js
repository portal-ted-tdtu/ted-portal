// middleware/authMiddleware.js

import { UnauthorizedError } from "../shared/errors/UnauthorizedError.js";
import { verifyToken } from "../utils/tokens/verifyToken.js";

export async function authMiddleware(ctx) {
    const authHeader = ctx.request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Token is required");
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
        throw new UnauthorizedError("Token is required");
    }

    const payload = await verifyToken(
        token,
        ctx.bindings.jwtSecret
    );

    if (!payload) {
        throw new UnauthorizedError("Token invalid or expired");
    }

    ctx.authToken = token;
    ctx.user = payload;

    return ctx;
}