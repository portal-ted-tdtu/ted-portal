// modules/users/services/createUserService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ConflictError } from "../../../shared/errors/ConflictError.js";
import { ROLE, ROLE_GROUP, DEPARTMENT } from "../../../shared/constants/permission.js";
import { checkGroup, checkDepartment } from "../../../utils/permission/checkPermission.js";
import { first } from "../../../database/query.js";
import { createUserRepository } from "../repositories/createUserRepository.js";
import { hashPassword} from "../../../utils/passwords/hashPassword.js"

export async function createUserService(ctx) {
    if (!checkGroup(ctx.user, ROLE_GROUP.TEAMLEAD) || !checkDepartment(ctx.user, DEPARTMENT.DD)) {
        throw new ForbiddenError("Permission denied");
    }

    const {
        user_id,
        user_name,
        birthday = null,
        sex = 0,
        faculty_id = null,
        phone = null,
        email = null,
        department_id = null,
        role_id = null,
        generation_id = null,
        avatar = null,
        is_active = 1
    } = ctx.body;

    const exists = await first(ctx.bindings.db, `
        SELECT user_id
        FROM USERS
        WHERE user_id = ?
        LIMIT 1
    `, [user_id]);

    if (exists) {
        throw new ConflictError("User already exists");
    }

    const studentId = user_id;
    const studentEmail = `${studentId}@student.tdtu.edu.vn`;
    const password = await hashPassword(`TED${user_id.slice(-4)}`);

    const repository = new createUserRepository(ctx.bindings.db);

    await repository.createUser(
        user_id,
        user_name,
        birthday,
        sex,
        studentId,
        studentEmail,
        faculty_id,
        phone,
        email,
        password,
        department_id,
        role_id,
        generation_id,
        avatar,
        is_active,
        ctx.user.user_id
    );

    return {
        user_id,
        user_name,
        birthday,
        sex,
        student_id: studentId,
        student_email: studentEmail,
        faculty_id,
        phone,
        email,
        department_id,
        role_id,
        generation_id,
        avatar,
        is_active
    };
}