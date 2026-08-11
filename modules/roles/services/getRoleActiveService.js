// modules/roles/services/getRoleActiveService.js

import { getRoleActiveRepository } from "../repositories/getRoleActiveRepository.js";

export async function getRoleActiveService(ctx) {

    const repository = new getRoleActiveRepository(ctx.bindings.db);

    return await repository.getRoleActive();
}