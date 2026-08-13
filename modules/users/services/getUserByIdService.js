// modules/users/services/getUserByIdService.js

import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { getUserByIdRepository } from "../repositories/getUserByIdRepository.js";

export async function getUserByIdService(ctx) {
    const repository = new getUserByIdRepository(ctx.bindings.db);
    const user = await repository.findById(ctx.params.user_id);

    if (!user) throw new NotFoundError("User not found");

    return user;
}