// modules/mistakes/repositories/getMistakeByIdRepository.js

import { first } from "../../../database/query.js";

export class getMistakeByIdRepository {

    constructor(db) {
        this.db = db;
    }

    async findById(mistakeId) {

        return await first(
            this.db,
            `
            SELECT
                mistake_id,
                mistake_name,
                level,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM MISTAKES
            WHERE mistake_id = ?
            `,
            [mistakeId]
        );
    }
}