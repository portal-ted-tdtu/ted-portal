// modules/users/services/getUserActiveService.js

import { getUserActiveRepository } from "../repositories/getUserActiveRepository.js";

export async function getUserActiveService(ctx) {
    const departmentId = ctx.query.department_id?.trim() || null;
    const repository = new getUserActiveRepository(ctx.bindings.db);
    return await repository.getUserActive(departmentId);
}