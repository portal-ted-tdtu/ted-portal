// modules/users/services/updateMyProfileService.js

import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { getUserByIdRepository } from "../repositories/getUserByIdRepository.js";
import { updateUserRepository } from "../repositories/updateUserRepository.js";

export async function updateMyProfileService(ctx) {
    const userId = ctx.user.user_id;

    const findRepository = new getUserByIdRepository(ctx.bindings.db);
    const user = await findRepository.findById(userId);

    if (!user) throw new NotFoundError("User not found");

    const fields = {};
    const allowedFields = ["user_name", "birthday", "sex", "phone", "email", "avatar"];

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(ctx.body, field)) fields[field] = ctx.body[field];
    }

    const repository = new updateUserRepository(ctx.bindings.db);
    await repository.updateMyProfile(userId, fields, userId);

    return { user_id: userId, ...fields };
}