// modules/users/services/getUserListService.js

import { getUserListRepository } from "../repositories/getUserListRepository.js";
import { getUserListCountRepository } from "../repositories/getUserListCountRepository.js";
import { SYSTEM } from "../../../shared/constants/system.js";

export async function getUserListService(ctx) {
    const page = Number(ctx.query.page || SYSTEM.DEFAULT_PAGE);
    const pageSize = Number(ctx.query.page_size || SYSTEM.DEFAULT_PAGE_SIZE);
    const keyword = ctx.query.keyword?.trim() || null;
    const sex = ctx.query.sex === undefined || ctx.query.sex === "" ? null : Number(ctx.query.sex);
    const facultyId = ctx.query.faculty_id?.trim() || null;
    const departmentId = ctx.query.department_id?.trim() || null;
    const generationId = ctx.query.generation_id?.trim() || null;
    const isActive = ctx.query.is_active === undefined || ctx.query.is_active === "" ? null : Number(ctx.query.is_active);
    const offset = (page - 1) * pageSize;

    const listRepository = new getUserListRepository(ctx.bindings.db);
    const countRepository = new getUserListCountRepository(ctx.bindings.db);

    const items = await listRepository.getUserList(keyword, sex, facultyId, departmentId, generationId, isActive, pageSize, offset);
    const total = await countRepository.getTotal(keyword, sex, facultyId, departmentId, generationId, isActive);

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