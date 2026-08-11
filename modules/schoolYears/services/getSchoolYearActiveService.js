// modules/schoolYears/services/getSchoolYearActiveService.js

import { getSchoolYearActiveRepository } from "../repositories/getSchoolYearActiveRepository.js";

export async function getSchoolYearActiveService(ctx) {

    const repository =
        new getSchoolYearActiveRepository(
            ctx.bindings.db
        );

    return await repository.getSchoolYearActive();
}