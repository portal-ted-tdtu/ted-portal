// modules/mistakes/services/updateMistakeService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/role.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";

import { NotFoundError } from "../../../shared/errors/NotFoundError.js";

import { getMistakeByIdRepository } from "../repositories/getMistakeByIdRepository.js";
import { updateMistakeRepository } from "../repositories/updateMistakeRepository.js";

export async function updateMistakeService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const {
        mistake_id,
        mistake_name,
        level,
        is_active
    } = ctx.body;

    const findRepository =
        new getMistakeByIdRepository(
            ctx.bindings.db
        );

    const mistake =
        await findRepository.findById(
            mistake_id
        );

    if (!mistake) {
        throw new NotFoundError(
            "Mistake not found"
        );
    }

    const repository =
        new updateMistakeRepository(
            ctx.bindings.db
        );

    await repository.updateMistake(
        mistake_id,
        mistake_name,
        level,
        is_active,
        ctx.user.user_id
    );

    return {
        mistake_id,
        mistake_name,
        level,
        is_active
    };
}