// modules/auth/services/changePasswordService.js

import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError.js";

import { findByUserIdRepository } from "../repositories/findByUserId.js";

import { updatePasswordRepository } from "../repositories/updatePassword.js";

import { comparePassword } from "../../../utils/passwords/comparePassword.js";

import { hashPassword } from "../../../utils/passwords/hashPassword.js";


export async function changePasswordService(ctx) {

    const {
        old_password,
        new_password
    } = ctx.body;

    const userId =
        ctx.user.user_id;

    const findRepository =
        new findByUserIdRepository(
            ctx.bindings.db
        );

    const updateRepository =
        new updatePasswordRepository(
            ctx.bindings.db
        );

    const user =
        await findRepository.findByUserId(
            userId
        );

    if (!user) {
        throw new UnauthorizedError(
            "User not found"
        );
    }

    if (!user.is_active) {
        throw new UnauthorizedError(
            "Account has been disabled"
        );
    }

    const matched =
        await comparePassword(
            old_password,
            user.password
        );

    if (!matched) {
        throw new UnauthorizedError(
            "Old password is incorrect"
        );
    }

    const samePassword =
        await comparePassword(
            new_password,
            user.password
        );

    if (samePassword) {
        throw new UnauthorizedError(
            "New password must be different from old password"
        );
    }

    const hashedPassword =
        await hashPassword(
            new_password
        );

    await updateRepository.updatePassword(
        user.user_id,
        hashedPassword,
        user.user_id
    );

    return {
        user_id: user.user_id
    };
}