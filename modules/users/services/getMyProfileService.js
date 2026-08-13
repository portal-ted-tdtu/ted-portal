// modules/users/services/getMyProfileService.js

import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { getUserByIdRepository } from "../repositories/getUserByIdRepository.js";

export async function getMyProfileService(ctx) {
    const repository = new getUserByIdRepository(ctx.bindings.db);
    const user = await repository.findById(ctx.user.user_id);

    if (!user) throw new NotFoundError("User not found");

    return user;
}