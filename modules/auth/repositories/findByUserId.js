// src/modules/auth/repositories/findByUserId.js

import { first } from "../../../database/query.js";

export class findByUserIdRepository {

    constructor(db) {
        this.db = db;
    }

    async findByUserId(userId) {
        return await first(
            this.db,
            `
            SELECT
                user_id,
                user_name,
                student_id,
                password,
                role_id,
                department_id,
                generation_id,
                faculty_id,
                is_active
            FROM USERS
            WHERE user_id = ?
            LIMIT 1
            `,
            [userId]
        );
    }
}