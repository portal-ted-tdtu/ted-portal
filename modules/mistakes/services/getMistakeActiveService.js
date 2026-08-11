// modules/mistakes/services/getMistakeActiveService.js

import { getMistakeActiveRepository } from "../repositories/getMistakeActiveRepository.js";

export async function getMistakeActiveService(ctx) {

    const repository =
        new getMistakeActiveRepository(
            ctx.bindings.db
        );

    return await repository.getMistakeActive();
}