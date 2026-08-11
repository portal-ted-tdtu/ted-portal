// ./middlewares/permissionMiddleware.js

import { ForbiddenError
 } from "../shared/errors/ForbiddenError.js";

/**
 * Check role
 *
 * @param {Object} ctx
 * @param {Array} roles
 */
export function checkRoles(
    ctx,
    roles = []
) {

    if (
        !roles.includes(
            ctx.user.role_id
        )
    ) {

        throw new ForbiddenError(
            "Permission denied"
        );
    }
}