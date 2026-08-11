// src/modules/eventTypes/services/getEventTypeActiveService.js

import { getEventTypeActiveRepository } from "../repositories/getEventTypeActiveRepository.js";

export async function getEventTypeActiveService(ctx) {

    const repository = new getEventTypeActiveRepository(ctx.bindings.db);

    return await repository.getEventTypeActive();
}