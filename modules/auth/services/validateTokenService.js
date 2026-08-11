// modules/auth/services/validateTokenService.js

import { verifyToken } from "../../../utils/tokens/verifyToken.js";

export async function validateTokenService(ctx) {
    const token = ctx.authToken;

    if (!token) {
        return {
            valid: false
        };
    }

    const payload = await verifyToken(
        token,
        ctx.bindings.jwtSecret
    );

    if (!payload) {
        return {
            valid: false
        };
    }

    return {
        valid: true,
        user: {
            user_id: payload.user_id,
            student_id: payload.student_id,
            role_id: payload.role_id,
            department_id: payload.department_id,
            faculty_id: payload.faculty_id,
            generation_id: payload.generation_id
        },
        expires_at: payload.exp
    };
}