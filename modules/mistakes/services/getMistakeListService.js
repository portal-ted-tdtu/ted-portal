// modules/mistakes/services/getMistakeListService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/role.js";

import { checkRole } from "../../../utils/permission/checkPermission.js";

import { getMistakeListRepository } from "../repositories/getMistakeListRepository.js";
import { getMistakeListCountRepository } from "../repositories/getMistakeListCountRepository.js";

export async function getMistakeListService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const page = Number(
        ctx.query.page || 1
    );

    const pageSize = Number(
        ctx.query.page_size || 20
    );

    const keyword =
        ctx.query.keyword?.trim() || null;

    const isActive =
        ctx.query.is_active === undefined ||
        ctx.query.is_active === ""
            ? null
            : Number(ctx.query.is_active);

    const offset =
        (page - 1) * pageSize;

    const listRepository =
        new getMistakeListRepository(
            ctx.bindings.db
        );

    const countRepository =
        new getMistakeListCountRepository(
            ctx.bindings.db
        );

    const items =
        await listRepository.getMistakeList(
            keyword,
            isActive,
            pageSize,
            offset
        );

    const total =
        await countRepository.getTotal(
            keyword,
            isActive
        );

    return {
        items,
        pagination: {
            page,
            page_size: pageSize,
            total,
            total_pages:
                Math.ceil(
                    total / pageSize
                )
        }
    };
}