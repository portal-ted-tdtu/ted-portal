// modules\auth\repositories\findByStudentId.js

import { first
 } from "../../../database/query.js";

export class findByStudentIdRepository {

    constructor(db) {
        this.db = db;
    }

    async findByStudentId(
        studentId
    ) {

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
            WHERE student_id = ?
            LIMIT 1
            `,
            [studentId]
        );
    }
}