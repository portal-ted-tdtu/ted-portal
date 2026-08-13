// modules/users/repositories/getUserListRepository.js

import { all } from "../../../database/query.js";

export class getUserListRepository {
    constructor(db) { this.db = db; }

    async getUserList(keyword, sex, facultyId, departmentId, generationId, isActive, limit, offset) {
        return await all(this.db, `
            SELECT
                user_id,
                user_name,
                birthday,
                sex,
                student_id,
                student_email,
                faculty_id,
                phone,
                email,
                department_id,
                role_id,
                generation_id,
                avatar,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM USERS
            WHERE
                (? IS NULL OR user_name LIKE ?)
                AND (? IS NULL OR sex = ?)
                AND (? IS NULL OR faculty_id = ?)
                AND (? IS NULL OR department_id = ?)
                AND (? IS NULL OR generation_id = ?)
                AND (? IS NULL OR is_active = ?)
            ORDER BY user_id DESC
            LIMIT ?
            OFFSET ?
        `, [
            keyword, keyword ? `%${keyword}%` : null,
            sex, sex,
            facultyId, facultyId,
            departmentId, departmentId,
            generationId, generationId,
            isActive, isActive,
            limit, offset
        ]);
    }
}