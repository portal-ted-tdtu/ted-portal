// src/modules/mistakes/services/getMistakeDetailService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";

import { ROLE } from "../../../shared/constants/role.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";

import { getMistakeDetailRepository } from "../repositories/getMistakeDetailRepository.js";

export async function getMistakeDetailService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const mistakeId =
        ctx.params.mistake_id;

    const repository =
        new getMistakeDetailRepository(
            ctx.bindings.db
        );

    const data =
        await repository.getMistakeDetail(
            mistakeId
        );

    if (!data) {
        throw new NotFoundError(
            "Mistake not found"
        );
    }

    return data;
}