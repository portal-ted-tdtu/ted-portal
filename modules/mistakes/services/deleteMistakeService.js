// modules/mistakes/services/deleteMistakeService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ConflictError } from "../../../shared/errors/ConflictError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";

import { ROLE } from "../../../shared/constants/permission.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";

import { foreignKeyReferences } from "../../../database/query.js";

import { getMistakeByIdRepository } from "../repositories/getMistakeByIdRepository.js";
import { deleteMistakeRepository } from "../repositories/deleteMistakeRepository.js";

export async function deleteMistakeService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const mistakeId =
        ctx.params.mistake_id;

    const findRepository =
        new getMistakeByIdRepository(
            ctx.bindings.db
        );

    const mistake =
        await findRepository.findById(
            mistakeId
        );

    if (!mistake) {
        throw new NotFoundError(
            "Mistake not found"
        );
    }

    const references =
        await foreignKeyReferences(
            ctx.bindings.db,
            "MISTAKES",
            "mistake_id",
            mistakeId
        );

    if (references.length > 0) {

        throw new ConflictError(
            "Cannot delete mistake because it is referenced by another record"
        );
    }

    const repository =
        new deleteMistakeRepository(
            ctx.bindings.db
        );

    await repository.deleteMistake(
        mistakeId
    );

    return {
        mistake_id: mistakeId
    };
}