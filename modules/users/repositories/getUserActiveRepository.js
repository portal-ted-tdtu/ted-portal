// modules/users/repositories/getUserActiveRepository.js

import { all } from "../../../database/query.js";

export class getUserActiveRepository {
    constructor(db) { this.db = db; }

    async getUserActive(departmentId) {
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
                avatar
            FROM USERS
            WHERE is_active = 1
                AND (? IS NULL OR department_id = ?)
            ORDER BY user_id DESC
        `, [departmentId, departmentId]);
    }
}