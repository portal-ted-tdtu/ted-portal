// src/modules/mistakes/repositories/getMistakeDetailRepository.js

import { first } from "../../../database/query.js";

export class getMistakeDetailRepository {

    constructor(db) {
        this.db = db;
    }

    async getMistakeDetail(mistakeId) {

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
            [
                mistakeId
            ]
        );
    }
}