// modules/schoolYears/services/createSchoolYearService.js

import { ROLE } from "../../../shared/constants/permission.js";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";
import { getNextCounter } from "../../../utils/counters/getNextCounter.js";
import { increaseCounter } from "../../../utils/counters/increaseCounter.js";

import { createSchoolYearRepository } from "../repositories/createSchoolYearRepository.js";
import { buildSchoolYear } from "./buildSchoolYear.js";

const PREFIX_KEY = "NH"

export async function createSchoolYearService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const counter = await getNextCounter(
        ctx.bindings.db,
        "SCHOOL_YEARS",
        PREFIX_KEY
    );

    const schoolYear =
        buildSchoolYear(
            counter.number
        );

    const repository =
        new createSchoolYearRepository(
            ctx.bindings.db
        );

    await repository.createSchoolYear(
        schoolYear.school_year_id,
        schoolYear.school_year_name,
        schoolYear.date_start,
        schoolYear.date_end,
        ctx.user.user_id
    );

    await increaseCounter(
        ctx.bindings.db,
        "SCHOOL_YEARS",
        PREFIX_KEY
    );

    return schoolYear;
}