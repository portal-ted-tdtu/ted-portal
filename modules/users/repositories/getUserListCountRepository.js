// modules/users/repositories/getUserListCountRepository.js

import { first } from "../../../database/query.js";

export class getUserListCountRepository {
    constructor(db) { this.db = db; }

    async getTotal(keyword, sex, facultyId, departmentId, generationId, isActive) {
        const result = await first(this.db, `
            SELECT COUNT(*) AS total
            FROM USERS
            WHERE
                (? IS NULL OR user_name LIKE ?)
                AND (? IS NULL OR sex = ?)
                AND (? IS NULL OR faculty_id = ?)
                AND (? IS NULL OR department_id = ?)
                AND (? IS NULL OR generation_id = ?)
                AND (? IS NULL OR is_active = ?)
        `, [
            keyword, keyword ? `%${keyword}%` : null,
            sex, sex,
            facultyId, facultyId,
            departmentId, departmentId,
            generationId, generationId,
            isActive, isActive
        ]);

        return result.total;
    }
}