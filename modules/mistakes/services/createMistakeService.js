// modules/mistakes/services/createMistakeService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/role.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";
import { getNextCounter } from "../../../utils/counters/getNextCounter.js";
import { increaseCounter } from "../../../utils/counters/increaseCounter.js";

import { createMistakeRepository } from "../repositories/createMistakeRepository.js";

const PREFIX_KEY = "MIS"

export async function createMistakeService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const {
        mistake_name,
        level,
        is_active
    } = ctx.body;

    const counter = await getNextCounter(
        ctx.bindings.db,
        "MISTAKES",
        PREFIX_KEY
    );

    const mistakeId = counter.code;

    const repository =
        new createMistakeRepository(
            ctx.bindings.db
        );

    await repository.createMistake(
        mistakeId,
        mistake_name,
        level,
        is_active,
        ctx.user.user_id
    );

    await increaseCounter(
        ctx.bindings.db,
        "MISTAKES",
        PREFIX_KEY
    );

    return {
        mistake_id: mistakeId,
        mistake_name,
        level,
        is_active
    };
}