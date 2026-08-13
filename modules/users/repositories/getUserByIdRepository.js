// modules/users/repositories/getUserByIdRepository.js

import { first } from "../../../database/query.js";

export class getUserByIdRepository {
    constructor(db) { this.db = db; }

    async findById(userId) {
        return await first(this.db, `
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
            WHERE user_id = ?
        `, [userId]);
    }
}