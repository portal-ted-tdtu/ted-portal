import { getDepartmentActiveRepository } from "../repositories/getDepartmentActiveRepository.js";

export async function getDepartmentActiveService(ctx) {

    const repository =
        new getDepartmentActiveRepository(
            ctx.bindings.db
        );

    return await repository.getDepartmentActive();
}