// modules/generations/services/createGenerationService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/permission.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";
import { getNextCounter } from "../../../utils/counters/getNextCounter.js";
import { increaseCounter } from "../../../utils/counters/increaseCounter.js";

import { createGenerationRepository } from "../repositories/createGenerationRepository.js";

const PREFIX_KEY = "TED"

export async function createGenerationService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const counter = await getNextCounter(
        ctx.bindings.db,
        "GENERATIONS",
        PREFIX_KEY
    );

    const generationId = counter.code;
    const generationName = `Thế hệ ${counter.number}`;

    const repository =
        new createGenerationRepository(
            ctx.bindings.db
        );

    await repository.createGeneration(
        generationId,
        generationName,
        ctx.user.user_id
    );

    await increaseCounter(
        ctx.bindings.db,
        "GENERATIONS",
        PREFIX_KEY
    );

    return {
        generation_id: generationId,
        generation_name: generationName
    };
}