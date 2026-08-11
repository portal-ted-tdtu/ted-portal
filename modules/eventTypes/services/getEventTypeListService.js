// src/modules/eventTypes/services/getEventTypeListService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/permission.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";

import { getEventTypeListRepository } from "../repositories/getEventTypeListRepository.js";
import { getEventTypeListCountRepository } from "../repositories/getEventTypeListCountRepository.js";

export async function getEventTypeListService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const page = Number(ctx.query.page || 1);
    const pageSize = Number(ctx.query.page_size || 20);
    const keyword = ctx.query.keyword?.trim() || null;
    const offset = (page - 1) * pageSize;

    const listRepository = new getEventTypeListRepository(ctx.bindings.db);
    const countRepository = new getEventTypeListCountRepository(ctx.bindings.db);

    const items = await listRepository.getEventTypeList(keyword, pageSize, offset);
    const total = await countRepository.getTotal(keyword);

    return {
        items,
        pagination: {
            page,
            page_size: pageSize,
            total,
            total_pages: Math.ceil(total / pageSize)
        }
    };
}