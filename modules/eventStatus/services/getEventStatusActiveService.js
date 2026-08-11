// modules/eventStatus/services/getEventStatusActiveService.js

import { getEventStatusActiveRepository } from "../repositories/getEventStatusActiveRepository.js";

export async function getEventStatusActiveService(ctx) {

    const repository = new getEventStatusActiveRepository(ctx.bindings.db);

    return await repository.getEventStatusActive();
}