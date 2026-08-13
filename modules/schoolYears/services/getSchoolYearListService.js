// modules/schoolYears/services/getSchoolYearListService.js

import { ROLE } from "../../../shared/constants/role.js";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";

import { getSchoolYearListRepository } from "../repositories/getSchoolYearListRepository.js";
import { getSchoolYearListCountRepository } from "../repositories/getSchoolYearListCountRepository.js";

export async function getSchoolYearListService(ctx) {

    if (!checkRole(ctx.user, ROLE.CAPTAIN)) {
        throw new ForbiddenError("Permission denied");
    }

    const page = Number(ctx.query.page || 1);
    const pageSize = Number(ctx.query.page_size || 20);
    const keyword = ctx.query.keyword?.trim() || null;
    const offset = (page - 1) * pageSize;

    const listRepository = new getSchoolYearListRepository(ctx.bindings.db);
    const countRepository = new getSchoolYearListCountRepository(ctx.bindings.db);

    const items = await listRepository.getSchoolYearList(keyword, pageSize, offset);
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