// modules/faculties/services/getFacultyActiveService.js

import { getFacultyActiveRepository } from "../repositories/getFacultyActiveRepository.js";

export async function getFacultyActiveService(ctx) {

    const repository = new getFacultyActiveRepository(ctx.bindings.db);

    return await repository.getFacultyActive();
}