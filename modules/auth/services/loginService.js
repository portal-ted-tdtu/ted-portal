// ./modules/auth/services/loginService.js

import { UnauthorizedError
 } from "../../../shared/errors/UnauthorizedError.js";

import { createToken
 } from "../../../utils/tokens/createToken.js";

import { comparePassword
 } from "../../../utils/passwords/comparePassword.js";

import { findByStudentIdRepository
 } from "../repositories/findByStudentId.js";

export async function loginService(
    ctx
) {

    const {
        student_id,
        password
    } = ctx.body;

    const repository =
        new findByStudentIdRepository(
            ctx.bindings.db
        );

    const user =
        await repository.findByStudentId(
            student_id
        );

    if (!user) {

        throw new UnauthorizedError(
            "Student ID or password is incorrect"
        );
    }

    if (!user.is_active) {

        throw new UnauthorizedError(
            "Account has been disabled"
        );
    }

    const matched =
        await comparePassword(
            password,
            user.password
        );

    if (!matched) {

        throw new UnauthorizedError(
            "Student ID or password is incorrect"
        );
    }

    const token =
        await createToken(
            {
                user_id:
                    user.user_id,

                student_id:
                    user.student_id,

                role_id:
                    user.role_id,

                department_id:
                    user.department_id,

                faculty_id:
                    user.faculty_id,

                generation_id:
                    user.generation_id
            },
            ctx.bindings.jwtSecret,
            "4h"
        );

    return {
        access_token:
            token,

        user: {
            user_id:
                user.user_id,

            user_name:
                user.user_name,

            student_id:
                user.student_id,

            role_id:
                user.role_id,

            department_id:
                user.department_id,

            faculty_id:
                user.faculty_id,

            generation_id:
                user.generation_id
        }
    };
}