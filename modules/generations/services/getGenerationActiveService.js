// modules/generations/services/getGenerationActiveService.js

import { getGenerationActiveRepository } from "../repositories/getGenerationActiveRepository.js";

export async function getGenerationActiveService(ctx) {

    const repository = new getGenerationActiveRepository(ctx.bindings.db);

    return await repository.getGenerationActive();
}