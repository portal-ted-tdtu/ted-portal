import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ROLE } from "../../../shared/constants/permission.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";

import { getGenerationListRepository } from "../repositories/getGenerationListRepository.js";
import { getGenerationListCountRepository } from "../repositories/getGenerationListCountRepository.js";

export async function getGenerationListService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const page = Number(ctx.query.page || 1);
    const pageSize = Number(ctx.query.page_size || 20);
    const keyword = ctx.query.keyword?.trim() || null;
    const offset = (page - 1) * pageSize;

    const listRepository = new getGenerationListRepository(ctx.bindings.db);
    const countRepository = new getGenerationListCountRepository(ctx.bindings.db);

    const items = await listRepository.getGenerationList(keyword, pageSize, offset);
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