// modules/users/services/updateUserService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { ROLE_GROUP, DEPARTMENT } from "../../../shared/constants/permission.js";
import { checkGroup, checkDepartment } from "../../../utils/permission/checkPermission.js";
import { getUserByIdRepository } from "../repositories/getUserByIdRepository.js";
import { updateUserRepository } from "../repositories/updateUserRepository.js";

export async function updateUserService(ctx) {
    if (!checkGroup(ctx.user, ROLE_GROUP.TEAMLEAD) || !checkDepartment(ctx.user, DEPARTMENT.DD)) throw new ForbiddenError("Permission denied");

    const userId = ctx.body.user_id;

    const findRepository = new getUserByIdRepository(ctx.bindings.db);
    const user = await findRepository.findById(userId);

    if (!user) throw new NotFoundError("User not found");

    const fields = {};
    const allowedFields = ["user_name", "birthday", "sex", "faculty_id", "phone", "email", "department_id", "role_id", "avatar", "is_active"];

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(ctx.body, field)) fields[field] = ctx.body[field];
    }

    const repository = new updateUserRepository(ctx.bindings.db);
    await repository.updateUser(userId, fields, ctx.user.user_id);

    return { user_id: userId, ...fields };
}