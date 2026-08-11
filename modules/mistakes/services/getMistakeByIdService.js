// modules/mistakes/services/getMistakeByIdService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/permission.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";

import { NotFoundError } from "../../../shared/errors/NotFoundError.js";

import { getMistakeByIdRepository } from "../repositories/getMistakeByIdRepository.js";

export async function getMistakeByIdService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const mistakeId =
        ctx.params.mistake_id;

    const repository =
        new getMistakeByIdRepository(
            ctx.bindings.db
        );

    const mistake =
        await repository.findById(
            mistakeId
        );

    if (!mistake) {
        throw new NotFoundError(
            "Mistake not found"
        );
    }

    return mistake;
}